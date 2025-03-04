import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import ProductCard from "@/components/modules/productCard/ProductCard";

const Latest = () => {
    return (
        <div className={styles.container}>
            <section className={styles.title}>
                <div>
                    <p>آخرین محصولات</p>
                    <span>Latest products</span>
                </div>
                <Link className={styles.link} href={"/category"}>
                    مشاهده همه <FaChevronLeft />{" "}
                </Link>
            </section>
            <main
                data-aos="fade-down-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="6000"
                className={styles.products}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </main>
        </div>
    );
};

export default Latest;
