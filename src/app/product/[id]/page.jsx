import styles from "@/styles/product.module.css";
import Details from "@/components/templates/product/details/Details";
import Gallery from "@/components/templates/product/gallery/Gallery";
import Tabs from "@/components/templates/product/tabs/Tabs";
import MoreProducts from "@/components/templates/product/moreProducts/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/serverAuth";
import connectToDB from "@/configs/db";
import mongoose from "mongoose";
import ProductModel from "@/models/Product";

const ProductPage = async ({ params }) => {
  const user = await authUser();
  await connectToDB();

  const productID = params.id;

  // بررسی کنیم که آیا `productID` مقدار معتبری برای `ObjectId` دارد؟
  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return <p>محصول یافت نشد!</p>;
  }

  // تبدیل به ObjectId
  const product = await ProductModel.findOne({
    _id: new mongoose.Types.ObjectId(productID),
  }).populate("comments");

  const relatedProducts = await ProductModel.find({ smell: product.smell });

  if (!product) {
    return <p>محصول یافت نشد!</p>;
  }

  return (
    <div className={styles.container}>
      <Navbar isLogin={!!user} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts
          relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
