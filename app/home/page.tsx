import { Achievements } from "@/components/home/achievements";
import { Clients } from "@/components/home/clients";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";

export default function Page() {
  return (
    <>
      <Hero />
      <Achievements />
      <Services />
      <Clients />
    </>
  );
}
