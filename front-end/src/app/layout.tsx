import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/common/providers";

export const metadata: Metadata = {
  title: "Create all kinds of products",
  description: "Generated by Nehemiah Products",
};

export default function RootLayouts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}

