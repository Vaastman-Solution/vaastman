import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "95%", label: "Success Rate" },
  { value: "20+", label: "Clients" },
];

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] flex-col justify-center py-10 md:py-0">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        {/* Left content */}
        <div className="flex flex-col gap-4">
          <Badge variant="outline" className="w-fit px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary border-primary/30">
            Crafting Modern Digital Experiences
          </Badge>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[2.75rem]">
            We help brands{" "}
            <span className="text-primary">grow online</span>
            {" "}with stunning
            <br className="hidden sm:block" />
            {" "}websites &amp; apps
          </h1>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Vaastman Solutions is a full-stack digital agency building
            high-performance websites, web apps, and mobile experiences that
            look great and deliver real results.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button size="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get a Quote
            </Button>
            <Button size="default" variant="outline">
              Our Work
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-extrabold text-foreground">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="flex justify-center md:justify-end md:pr-4">
          <div className="relative w-full max-w-sm min-h-[420px] overflow-hidden rounded-xl border-[3px] border-primary shadow-lg">
            <Image
              src="/hero-team.png"
              alt="Vaastman Solutions team collaborating"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
