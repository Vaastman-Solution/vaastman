import { Navbar1 } from "@/components/navbar";
import { Footer } from "@/components/home/footer";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-[90%]" suppressHydrationWarning>
      <Navbar1 />
      {children}
      <Footer />
    </div>
  );
}
