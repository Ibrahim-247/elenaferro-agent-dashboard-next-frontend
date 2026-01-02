import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Medlockrealty Dashboard",
  description: "Explore Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-full">
            <Header />
            <div className="p-6 bg-[#F6F6F6] w-full h-[calc(100vh-92px)] overflow-auto custom_scroll">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
