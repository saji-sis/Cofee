import {
  generateAccessToken,
  generateRefreshToken,
  valiadteEmail,
  valiadtePassword,
  verifyPassword,
} from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { email, password } = body; //برای لاگین فقط به ایمیل و رمز عبور نیاز داریم برای این روش

    // Validation
    const isValidEmail = valiadteEmail(email);
    const isValidPassword = valiadtePassword(password);

    if (!isValidEmail || !isValidPassword) {
      // اگه معتبر نبود نسبت به چیزی که داخل آوث تعریف کردیم خطا بده
      return Response.json(
        { message: "email or password is invalid" },
        { status: 419 }
      );
    }

    const user = await UserModel.findOne({ email }); //حالا با کمک فایندوان به اولین کسی که این ایمیل داشته باشه پیدا میکنیم

    if (!user) {
      // اگه کلا کسی نباشه خطا بده
      return Response.json({ message: "User not found" }, { status: 422 });
    }

    const isCorrectPasswordWithHash =await verifyPassword(password, user.password); // حالا درصورتی که ایمیل وجود داشت ،پسورد ورودی توسط کاربر را با پسوردهش شده داخل دیتابیس را بررسی میکنیم

    if (!isCorrectPasswordWithHash) {
      //اگه برابر نبودند خطا برمیگردونم برای هردو که هکر متوجه نشه
      return Response.json(
        { message: "Email or password is not correct" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken,
        },
      }
    );

    return Response.json(
      { message: "User logged in successfully :))" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;`,
        },
      }
    );
  } catch (err) {
    console.log("Err ->", err);
    return Response.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
}
