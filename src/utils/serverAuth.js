import { cookies } from "next/headers";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyAccessToken } from "./auth";

const authUser = async () => {
  connectToDB();
  const token = cookies().get("token"); //توکن مرورگر کاربر را گرفتهّ
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value); //بررسی معتبر بودن توکن
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }

  return user;
};

export { authUser };
