import connectToDB from "@/configs/db";
import UserModel from "@/models/User";//چون به مدل کاربر کار داریم و اطلاعات میخوایم اضافه کنیم بهش و همچین چک و بررسی داشته باشیم ایمپورتش میکنیم
import sanitize from "mongo-sanitize"; // npm install mongo-sanitize {برای جلوگیری از حملات}
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";


export async function POST(req) {
    connectToDB();//اول از هرچی وصل میشیم به دیتابیس

    const body = await req.json();//به اطلاعاتی که توسط پست به سمت ما ارسال شده به این شکل دسترسی پیدا میکنیم
    const { name, phone, email, password } = body;//که انتظار داریم اطلاعات شامل این موارد باشند

    // Validation

    const sanitizedName = sanitize(String(name).trim());//برای جلوگیری از حملات اینجیکشن
    const sanitizedPhone = sanitize(String(phone).trim());//برای جلوگیری از حملات اینجیکشن
    const sanitizedEmail = email ? sanitize(String(email).trim()) : null;//برای جلوگیری از حملات اینجیکشن

    const isUserExist = await UserModel.findOne({//اول اینکه باید چک کنیم ببینم از قبل همچین مواردی داخل کالکشن (مدل) کاربران ما وجود نداشته باشه
        $or: [{ name: sanitizedName },
        { phone: sanitizedPhone },
        ...(sanitizedEmail ? [{ email: sanitizedEmail }] : []),
        ],
    });

    if (isUserExist) {// اگه از قبل با اون مشخصات کاربری وجود داشته باشه خطا بهش میدیم
        return Response.json(
            {
                message: "The username or email or phone exist already !!",
            },
            {
                status: 422,
            }
        );
    }

    const hashedPassword = await hashPassword(password);//تابع ای که ساخته بودیم داخل اوث برای هش کردن پسورد را فراخوانی میکنیم و سپس پسورد ورودی توسط کاربر را بهش پاس میدهیم
    const accessToken = generateAccessToken({ name, email });//همچنین با این تابع یک توکن میسازیم و به عنوان پیلود ، اسم کاربر رابهش پاس میدیم

    const users = await UserModel.find({});//کل داکیونت یوزر رو میگیریم برای بررسی اینکه از قبل داکیومنتی داخلش وجود داره یا خیر
    const userRole = users.length > 0 ? roles.USER : roles.ADMIN;// و همچنین چک میکنیم اگه داخل مدل یوزرها اگه داکیومنتی از قبل باشه رولش تعیین میکنیم


    // ایجاد کاربر جدید
    const newUser = {
        name: sanitizedName,
        phone: sanitizedPhone,
        password: hashedPassword,// فقط اینجا خود پسورد ورودی کاربر نباید ذخیره بشه داخل دیتابیس،بلکه مقدار هش شده باید ذخیره بشه
        role: userRole,
    };

    if (sanitizedEmail) {
        newUser.email = sanitizedEmail; // اگر ایمیل مقدار داشت، ذخیره شود.
    }

    await UserModel.create(newUser);// خب اگه همچی درست بود کاربر را ایجاد میکنیم با فیلد هایه بالاتر

    return Response.json(
        { message: "User signed up successfully :))" },
        {
            status: 201,
            headers: { "Set-Cookie": `token=${accessToken};Path=/; HttpOnly; Secure; SameSite=Strict` },
        }
    );
}
