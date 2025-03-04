import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/templates/home/banner/Banner";
import Latest from "@/components/templates/home/latest/Latest";
import Promote from "@/components/templates/home/promote/Promote";
import Articles from "@/components/templates/home/articles/Articles";
import Footer from "@/components/modules/footer/Footer";
import { authUser } from "@/utils/serverAuth";

export default async function Home() {
  const user = await authUser();

  return (
    <>
      {/* ارسال مقدار صحیح یا غلط درصورت لاگین بودن کاربر برای نمایش منو لاگین یا حساب کاربری */}
      <Navbar isLogin={user ? true : false} />
      <Banner />
      <Latest />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
