"use client";

import Aos from "aos";
import React, { useEffect } from "react";
import "aos/dist/aos.css";

function AOSInit() {
    useEffect(() => {
        Aos.init();// طبق خود داکیومنت استفاده میکنیم
    }, []);

    return null;// چون فقط به تابع و یا همون لاجیکش نیاز داریم برای استفاده ُ پس مقدار ریترن شده ای ندارد
}

export default AOSInit;
