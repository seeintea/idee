import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"max-w-main mx-auto flex flex-col gap-8"}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
