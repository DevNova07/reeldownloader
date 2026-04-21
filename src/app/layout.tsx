import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://savclip.net"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
