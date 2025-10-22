// global imports
import type { Metadata } from "next";

// local imports
import { NavBar, Providers } from "@/components";

import "@repo/ui/globals.css";

import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the ones you need
});

export const metadata: Metadata = {
  title: "The Spot",
  description: "The Spot is the best place to find the best clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Providers>
          <div className="sm:max-w-xl sm:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto p-4 space-y-4">
            <NavBar />
            <div className="min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-18rem)]">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
