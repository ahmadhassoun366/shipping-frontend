import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import AppInit from "@/components/init/app.init";
import ContextComponent from "@/components/context/context.component";

import AppConfig from "@/static/app.config";

import "@/scss/global.scss";
import HeaderComponent from "./layout/header/header.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const space_grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: AppConfig.name,
  description: AppConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href={`https://kit.fontawesome.com/${process.env.NEXT_PUBLIC_FONTAWESOME_KEY}.css`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={space_grotesk.variable}>
        <ContextComponent>
          <AppInit>{children}</AppInit>
          <ToastContainer />
        </ContextComponent>
      </body>
    </html>
  );
}
