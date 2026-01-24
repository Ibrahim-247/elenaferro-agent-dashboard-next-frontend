import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/provider/QueryProvider";
import ReduxProvider from "@/provider/ReduxProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        <Toaster />
        <QueryProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_GOOGLE_CLIENT_ID}>
            <ReduxProvider>{children}</ReduxProvider>
          </GoogleOAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
