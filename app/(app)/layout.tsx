import { AppFooter } from "@/component/app-footer";
import { AppHeader } from "@/component/app-header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"w-xl mx-auto py-24 flex flex-col gap-4"}>
      <AppHeader />
      {children}
      <AppFooter />
    </main>
  );
}
