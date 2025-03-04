import { useState } from "react";
import styles from "./register.module.css";
import { HiHome } from "react-icons/hi2";
import Sms from "./Sms";
import Link from "next/link";
import { registerValidationSchema, valiadteEmail, valiadtePassword, valiadtePhone } from "@/utils/auth";
import { useFormik } from "formik";



const Register = ({ showloginForm }) => {
    const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
    const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

    const [message, setMessage] = useState(null);

    const hideOtpForm = () => setIsRegisterWithOtp(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            setMessage(null);

            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message);

                setMessage({ type: "success", text: "ثبت‌نام با موفقیت انجام شد!" });
                resetForm();
            } catch (error) {
                setMessage({ type: "error", text: error.message });
            }
        },
    });



    // const signUp = async () => {
    //     //start validations inputs
    //     if (!name.trim()) {
    //         return showSwal("نام را وارد بکنید", "error", "تلاش مجدد");
    //     }

    //     const isValidPhone = valiadtePhone(phone);
    //     if (!isValidPhone) {
    //         return showSwal("شماره تماس وارد شده معتبر نیست", "error", "تلاش مجدد ");
    //     }

    //     if (email) {
    //         const isValidEmail = valiadteEmail(email);
    //         if (!isValidEmail) {
    //             return showSwal("ایمیل وارد شده معتبر نیست", "error", "تلاش مجدد ");
    //         }
    //     }

    //     const isValidPassword = valiadtePassword(password);
    //     if (!isValidPassword) {
    //         return showSwal("پسورد وارد شده قابل حدس هست", "error", "تلاش مجدد ");
    //     }
    //     //finish validations inputs

    //     const user = { name, phone, email, password };

    //     const res = await fetch("/api/auth/signup", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(user),
    //     });

    //     if (res.status === 201) {
    //         showSwal("ثبت نام با موفقیت انجام شد", "success", "ورود به پنل کاربری");
    //     } else if (res.status === 422) {
    //         showSwal("کاربری با این اطلاعات از قبل وجود دارد", "error", "تلاش مجدد");
    //     }
    // };


    return (
        <>
            {
                isRegisterWithOtp ? (<Sms hideOtpForm={hideOtpForm} />)
                    : (
                        <div className={styles.box_form}>

                            {message && (
                                <p className={`text-${message.type === "success" ? "green" : "red"}`}>
                                    {message.text}
                                </p>
                            )}

                            <form onSubmit={formik.handleSubmit} className={styles.form} >
                                <input
                                    className={styles.input}
                                    // value={name}
                                    // onChange={(event) => setName(event.target.value)}
                                    type="text"
                                    name="name"
                                    placeholder="نام"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className={styles.error_message}>{formik.errors.name}</p>
                                )}
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="phone"
                                    // value={phone}
                                    // onChange={(event) => setPhone(event.target.value)}
                                    placeholder="شماره موبایل"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <p className={styles.error_message}>{formik.errors.phone}</p>
                                )}
                                <input
                                    className={styles.input}
                                    type="email"
                                    name="email"
                                    // value={email}
                                    // onChange={(event) => setEmail(event.target.value)}
                                    placeholder="ایمیل (دلخواه)"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className={styles.error_message}>{formik.errors.email}</p>
                                )}

                                {isRegisterWithPass && (
                                    <>
                                        <input
                                            className={styles.input}
                                            type="password"
                                            name="password"
                                            // value={password}
                                            // onChange={(event) => setPassword(event.target.value)}
                                            placeholder="رمز عبور"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password && (
                                            <p className={styles.error_message}>{formik.errors.password}</p>
                                        )}
                                    </>
                                )}

                                <p
                                    style={{ marginTop: "1rem" }}
                                    className={styles.btn}
                                    onClick={() => setIsRegisterWithOtp(true)}
                                >
                                    ثبت نام با کد تایید
                                </p>

                                {/* <button
                                    style={{ marginTop: ".7rem" }}
                                    onClick={() => {
                                        if (isRegisterWithPass) {
                                            signUp();
                                        } else {
                                            setIsRegisterWithPass(true);
                                        }
                                    }}
                                    className={styles.btn}
                                >
                                    ثبت نام با رمزعبور
                                </button> */}
                                <button
                                    style={{ marginTop: ".7rem" }}
                                    type={isRegisterWithPass ? "submit" : "button"}
                                    onClick={() => {
                                        if (!isRegisterWithPass) {
                                            setIsRegisterWithPass(true);
                                        }
                                    }}
                                    className={styles.btn}
                                >
                                    ثبت نام با رمزعبور
                                </button>
                            </form>
                            <p onClick={showloginForm} className={styles.back_to_login}>
                                برگشت به ورود
                            </p>
                        </div>
                    )
            }
            <Link href={"/"} className={styles.redirect_to_home}>
                <HiHome />
                بازگشت به خانه
            </Link>
        </>
    );
};

export default Register;
