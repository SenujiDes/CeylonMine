import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Mining Royalty Calculator",
  description: "Calculate and track mining royalties",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white m-0 p-0 min-h-screen">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
