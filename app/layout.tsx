import type { Metadata } from "next";
import "./globals.css";
import { CatProvider } from "@/context/CatContext";

export const metadata: Metadata = {
  title: "Shashank Suman // SANK-OS CAT TERMINAL",
  description: "Personal hacker terminal developer portfolio and operating system featuring Mochi the interactive cyber cat companion.",
  keywords: ["Shashank Suman", "Developer Portfolio", "Next.js 14", "TypeScript", "Terminal UI", "SANK-OS", "Mochi Cat"],
  authors: [{ name: "Shashank Suman" }],
  openGraph: {
    title: "Shashank Suman // SANK-OS CAT TERMINAL",
    description: "You didn't visit a portfolio. You booted into someone's computer.",
    url: "https://sank-os.vercel.app",
    siteName: "SANK-OS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-mint antialiased min-h-screen selection:bg-mint selection:text-black">
        <CatProvider>{children}</CatProvider>
      </body>
    </html>
  );
}
