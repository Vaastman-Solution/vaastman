import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "95%", label: "Success Rate" },
  { value: "20+", label: "Clients" },
];

export function Hero() {
  return (
    <section className="flex flex-col items-center -mt-4">
      {/* ── Image — constrained, smaller, no top gap ────────────────────────── */}
      <div className="relative w-full mx-auto">
        <Image
          src="/hero1_light.png"
          alt="Vaastman Solutions team at work"
          width={2048}
          height={768}
          priority
          className="w-full h-auto dark:opacity-0 transition-opacity duration-300"
        />
        <Image
          src="/hero1_dark.png"
          alt="Vaastman Solutions team at work"
          width={2048}
          height={768}
          priority
          className="w-full h-auto absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Text — pulled up tight below image ──────────────────────────────── */}
      <div className="flex flex-col items-center text-center gap-5 px-6 -mt-8 relative z-10 w-full max-w-4xl mx-auto pb-16">
        <Badge
          variant="outline"
          className="px-4 py-1 text-[11px] font-semibold tracking-[0.15em] uppercase text-primary border-primary/30 rounded-full"
        >
          Crafting Modern Digital Experiences
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
          We help brands <span className="text-primary">grow online</span>
          <br className="hidden sm:block" /> with stunning websites &amp; apps
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Vaastman Solutions is a full-stack digital agency specialising in
          high-performance websites, web apps, and mobile experiences. We
          combine sharp design with solid engineering to build products that
          look great, load fast, and deliver real business results.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7"
          >
            Get a Quote
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-7">
            Our Work
          </Button>
        </div>

        <div className="flex items-center gap-12 pt-4 border-t border-border/40 w-full justify-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5"
            >
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
    </section>
  );
}
