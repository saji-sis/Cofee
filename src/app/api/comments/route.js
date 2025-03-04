import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment"; //چون با مدل کامنت سروکار داریم باید بهش وصل بشیم
import ProductModel from "@/models/Product"; //و همچنین چون هرکامنت مختص یک محصول هست باید به مدل محصول برای دستیابی به آیدیش وصل بشیم

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, productID } = reqBody;

    // Validation

    const comment = await CommentModel.create({
      username,
      body,
      email,
      score,
      productID,
    });

    const updatedProduct = await ProductModel.findOneAndUpdate(
      {
        _id: productID,
      },
      {
        $push: {
          comments: comment._id,
        },
      }
    );

    return Response.json(
      {
        message: "Comment created successfully :))",
        data: comment,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {//اینجا حتما یک محدودیت سازی باید انجام بدیم که هرشخصی با هر رولی نتونه به این ای پی آی درخواست ارسال کنه
  const comments = await CommentModel.find({}, "-__v");
  return Response.json(comments);
}
