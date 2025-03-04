import { hash, compare } from "bcryptjs"; // برای هش کردن پسورد وارد شده  توسط کاربر،وهمچنین مقایسه پسورد هش شده با پسورد واردی توسط کاربر
import { sign, verify } from "jsonwebtoken"; //برای ساخت و اعتبارسنجی توکن ازینها استفاده میشه
import * as Yup from "yup";

const hashPassword = async (password) => {
  //برای هش کردن پسورد ، ورودی پسورد از ای پی آی زمان ساخت و یا ثبت نام گرفته میشه
  const hashedPassword = await hash(password, 12); // از متد هش با پاس دادن ورودی از سمت کاربر که از ای پی آی میگیریم و همیشه 12 هستش
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  // برای چک کردن پسورد ورودی توسط کاربر در زمان هایی مثل لاگین کردن و بررسی با پسورد هش شده داخل دیتابیس
  const isValid = await compare(password, hashedPassword); // از ای پی آی میگیریم و داخل این میریزیم
  return isValid;
};

const generateAccessToken = (data) => {
  // برای ساخت توکن
  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "60d", //مدت زمان معتبر بودن این توکن
  });
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    return tokenPayload;
  } catch (err) {
    console.log("Verify Access Token Error ->", err);
    return false;
  }
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey, {
    expiresIn: "15d",
  });
  return token;
};

const valiadteEmail = (email) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

const valiadtePhone = (phone) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

const valiadtePassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};

const registerValidationSchema = Yup.object({
  name: Yup.string().required("نام الزامی است"),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, "شماره تماس نامعتبر است")
    .required("شماره تماس الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است").nullable().notRequired(), // ایمیل اجباری نیست
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "رمز عبور باید حداقل شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد"
    )
    .required("رمز عبور الزامی است"),
});

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  valiadteEmail,
  valiadtePhone,
  valiadtePassword,
  registerValidationSchema,
};
