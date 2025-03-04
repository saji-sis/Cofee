"use client";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishlist({ productID }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    //در ابتدا باید چک کنیم که کاربر لاگین هست یا خیر! برای اضافه کردن محصول به لیست علاقه مندی ها
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setUser({ ...data });
      }
    };

    authUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();
    if (!user?._id) {
      return showSwal(
        "برای اضافه کردن به علاقه مندی‌ها لطفا ابتدا لاگین بکنین",
        "error",
        "فهمیدم"
      );
    }

    const wish = {
      user: user._id,
      product: productID,
    };

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wish),
      });

      console.log("Response ->", res);

      if (!res.ok) {
        // دریافت متن خطا از پاسخ
        const errorText = await res.text();
        throw new Error(`خطا در درخواست: ${res.status} - ${errorText}`);
      }

      if (res.status === 201) {
        showSwal(
          "محصول مورد نظر به علاقه‌مندی‌ها اضافه شد",
          "success",
          "فهمیدم"
        );
      }
    } catch (error) {
      console.error("خطا در ارسال درخواست:", error);
      showSwal("مشکلی پیش آمده، لطفاً دوباره تلاش کنید", "error", "متوجه شدم");
    }
  };

  return (
    <div onClick={addToWishlist}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
}

export default AddToWishlist;
