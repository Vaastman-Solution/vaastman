import { Hero } from "@/components/home/hero";
import { Achievements } from "@/components/home/achievements";
import { Services } from "@/components/home/services";
import { Clients } from "@/components/home/clients";

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

