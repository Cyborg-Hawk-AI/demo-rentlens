import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo — RentLens",
  description: "Interactive mock dashboard for RentLens property P&L management.",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
