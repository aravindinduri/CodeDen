import type { Metadata } from "next";
import { AppWrapper } from "@/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Den",
  description: "code den",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      
      <body>
        <AppWrapper>
          {children}
        </AppWrapper >
      </body>
    </html>
  );
}
