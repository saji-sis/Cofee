import AOSInit from "@/utils/aos";
import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "@/utils/SctollToTop";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "صفحه اصلی - SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "sajad_sis coffee project with next.js v13",

  icons: {
    icon: "/images/logo/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    // <html lang="fa" dir="rtl">
    <html lang="fa">
      <body className={inter.className}>
        {/* <AOSInit />  خب برای اینکه داخل تمامی پروژه بشه از این قابلیت استفاده کرد ، پس داخل لی اوت پخشش میکنم */}
        <AOSInit />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
