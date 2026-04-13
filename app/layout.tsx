import "./globals.css";
import { Manrope } from "next/font/google";
import Navbar from "./components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Renova",
  description: "Collaborative renovation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} bg-[#1c1f1d] text-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}