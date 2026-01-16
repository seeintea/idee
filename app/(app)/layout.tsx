import { AppFooter } from "@/component/app-footer";
import { AppHeader } from "@/component/app-header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"max-w-2xl mx-auto py-12 flex flex-col gap-8"}>
      <AppHeader />
      {children}
      <AppFooter />
    </main>
  );
}
