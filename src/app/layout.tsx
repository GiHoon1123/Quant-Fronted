import AppShell from "./components/AppShell";
import "./styles/globals.css";

export const metadata = {
  title: "QuantBot",
  description: "Quant trading frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-black text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
