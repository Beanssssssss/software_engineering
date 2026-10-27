import type { Metadata } from "next";
import "./globals.css";
import Splash from "@/components/Splash";

export const metadata: Metadata = {
  title: "좋은방 구하기",
  description: "지도 기반 원·투룸 탐색 서비스 클론 프로젝트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Splash />
        {children}
      </body>
    </html>
  );
}
