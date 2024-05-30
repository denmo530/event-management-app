import { Header } from "./marketing-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <Header />
      {children}
    </div>
  );
}
