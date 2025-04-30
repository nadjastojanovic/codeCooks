import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/authContext";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "CodeCooks",
  description: "AI-powered recipe platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-black font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
