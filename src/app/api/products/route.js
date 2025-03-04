import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product"; //چون با مدل(کالکشن) محصول سروکار داریم باید پس اول از هرچیزی بهش وصل بشیم

export async function POST(req) {
  //در اینجا فقط متد پست گرفته و بررسی میشه
  try {
    connectToDB();
    const body = await req.json();
    const {
      // در اینجا نیازی نیست تمام فیلد هایی که برای مدل محصول داخل پوشه مدلش ساختیم رو بگیریم! فقط فیلدهایی که اجباری هستند رو گفته
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    } = body;

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
    });

    return Response.json(
      { message: "Product created successfully :))", data: product },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  const products = await ProductModel.find({}, "-__v").populate("comments");
  return Response.json(products);
}


// باید برای پست و گت یک پروتکشن اعمال کنیم که هرشخصی نتونه با هر رولی به این ای پی آی ها درخواست ارسال کنه