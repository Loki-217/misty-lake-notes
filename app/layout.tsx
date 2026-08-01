import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://misty-lake-notes.khalil-lau.chatgpt.site"),
  title: {
    default: "Misty Lake Notes — Jason's lakeside journal",
    template: "%s · Misty Lake Notes",
  },
  description: "Jason 的湖畔个人空间：东方 Project、游戏、日常、技术与一些胡思乱想。",
  openGraph: {
    title: "Misty Lake Notes",
    description: "Jason 的湖畔个人空间：东方 Project、游戏、日常与技术。",
    type: "website",
    images: ["/cirno-doujin-hero.png"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('mln-theme');if(t==='night'||t==='light')document.documentElement.dataset.theme=t}catch(e){}" }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
