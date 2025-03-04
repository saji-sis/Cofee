import { MdOutlineSms } from "react-icons/md";
import styles from "./article.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaPinterest,
    FaTelegram,
    FaTwitter,
} from "react-icons/fa";

const Article = () => {
    return (
        <div className={styles.card}>
            <Link className={styles.img_container} href={"/article/123"}>
                <img
                    src="/images/sections/sliderSection.jpg"
                    alt=""
                />
            </Link>
            <div className={styles.date}>
                <span>24</span>
                <span>بهمن</span>
            </div>
            <div className={styles.details}>
                <span className={styles.tag}>قهوه</span>
                <Link href={"/article/123"} className={styles.title}>
                    مصرف قهوه با شیر برای کاهش التهاب
                </Link>
                <div>
                    <p>نویسنده</p>
                    <img
                        src="/images/sections/avatar.png"
                        alt=""
                    />
                    <p>Mohebi</p>
                    <div>
                        <MdOutlineSms />
                        <span>0</span>
                    </div>
                    <div className={styles.share}>
                        <IoShareSocialOutline />
                        <div className={styles.tooltip}>
                            <Link href={"/"}>
                                <FaTelegram />
                            </Link>
                            <Link href={"/"}>
                                <FaLinkedinIn />
                            </Link>
                            <Link href={"/"}>
                                <FaPinterest />
                            </Link>
                            <Link href={"/"}>
                                <FaTwitter />
                            </Link>
                            <Link href={"/"}>
                                <FaFacebookF />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
