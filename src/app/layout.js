import { Outfit } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { Suspense } from "react";
import Loading from "./loader";
const outfit = Outfit({
  subsets: ["latin"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} min-h-screen `}
      >
        <Header /> 
        <main className="container flex justify-center items-center m-auto ">
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
        </main>
        <ToastContainer position="top-center"/>
      </body>
    </html>
  );
}
