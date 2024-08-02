import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import 'firebaseui/dist/firebaseui.css';

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Summarist",
  description: "The Ultimate Reading App",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
};

export default Layout;
