import { AppFooter } from "@/component/app-footer";
import { AppHeader } from "@/component/app-header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"max-w-2xl mx-auto flex flex-col gap-8"}>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
