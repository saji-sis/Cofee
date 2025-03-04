import React from "react";
import styles from "@/styles/forget-password.module.css";
import Link from "next/link";
import { HiHome } from "react-icons/hi2";

const ForgotPassword = () => {
    return (
        <>
            <div className={styles.forgot_password}>
                <div data-aos="fade-up" className={styles.bg}>
                    <div className={styles.form}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="ایمیل / شماره موبایل"
                        />
                        <button style={{ marginTop: "1rem" }} className={styles.btn}>
                            بازنشانی رمزعبور
                        </button>
                        <Link href={"/login-register"} className={styles.back_to_login}>
                            برگشت به ورود
                        </Link>
                    </div>
                    <Link href={"/"} className={styles.redirect_to_home}>
                        <HiHome />
                        بازگشت به خانه
                    </Link>
                </div>
                <section>
                    <img
                        src="/images/sections/coffee-brain-caffeine-neuroscincces.webp"
                        alt=""
                    />
                </section>
            </div>
        </>
    );
};

export default ForgotPassword;
