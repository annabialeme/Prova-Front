import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Projeto Front",
    icons: {
    icon: "/icons/hospital.ico",
  },
    description: "Esse é um projeto consumindo uma API criada por mim, utilizando as melhores práticas de desenvolvimento web, foco em performance, modularidade, responsividade e UX/UI.",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
