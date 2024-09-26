import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layouts/navbar/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Footer from "@/components/layouts/footer/Footer";
import { UserProvider } from "@/components/providers/UserProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meme Makr",
  description: "Explore the meme maker ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <div className="flex flex-col h-dvh  p-4 pb-0">
              <Navbar />
              {children}
              <Footer />
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
