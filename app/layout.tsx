import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Authorize from "@/components/Authorize";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className="flex min-h-screen w-screen flex-row items-center justify-center
        bg-gradient-to-br from-[#05000e] to-[#032913] text-white"
        >
          <Authorize>{children}</Authorize>
        </main>
      </body>
    </html>
  );
}
