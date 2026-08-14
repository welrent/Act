import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./header-styles.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welrent | Smart Agreements",
  description: "Welrent Act - Smart Agreements Platform",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { AuthProvider } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="site-layout">
            <Sidebar />
            <div className="design-wrapper flex-grow min-h-screen flex flex-col w-full">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <div className="flex-grow" />
              <Footer />
            </div>
          </div>
          <LoginModal />
        </AuthProvider>
      </body>
    </html>
  );
}
