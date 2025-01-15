import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
