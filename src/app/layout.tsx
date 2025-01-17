import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "WebeWizard Flashcard React",
  description: "Brainscape clone in react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <div className="flex flex-col ">
            <TopBar />
            <div className="flex grow min-h-full">{children}</div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
