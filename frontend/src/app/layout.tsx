import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Layout from "@/components/layout/Layout";
import Analytics from "@/components/Analytics";
import LoadingScreen from "@/components/organisms/LoadingScreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlobalTalentDB",
  description:
    "Unite for Global Success: Partner with Local Specialists and Ambitious Allies Abroad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <Analytics />
        </Suspense>
        <Suspense fallback={<LoadingScreen />}>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
