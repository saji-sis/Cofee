"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { formValidationSchema } from "./validation";

export default function FormComponent() {
    const [message, setMessage] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            setMessage(null);

            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

                setMessage({ type: "success", text: data.message });
                formik.resetForm();
            } catch (error) {
                setMessage({ type: "error", text: error.message });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md max-w-md mx-auto">
            {/* پیام موفقیت یا خطا */}
            {message && <p className={`text-${message.type === "success" ? "green" : "red"}-500`}>{message.text}</p>}

            {/* فیلد نام */}
            <div>
                <label className="block mb-1 font-medium">نام:</label>
                <input
                    type="text"
                    name="name"
                    className="w-full border p-2 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <p className="text-red-500">{formik.errors.name}</p> : null}
            </div>

            {/* فیلد ایمیل */}
            <div>
                <label className="block mb-1 font-medium">ایمیل:</label>
                <input
                    type="email"
                    name="email"
                    className="w-full border p-2 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <p className="text-red-500">{formik.errors.email}</p> : null}
            </div>

            {/* فیلد رمز عبور */}
            <div>
                <label className="block mb-1 font-medium">رمز عبور:</label>
                <input
                    type="password"
                    name="password"
                    className="w-full border p-2 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? <p className="text-red-500">{formik.errors.password}</p> : null}
            </div>

            {/* دکمه ارسال */}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                ثبت‌نام
            </button>
        </form>
    );
}
