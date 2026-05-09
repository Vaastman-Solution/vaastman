"use client";

import { motion, type Variants } from "motion/react";
import { Badge } from "@/components/ui/badge";

interface Client {
  name: string;
  initials: string;
  industry: string;
  bg: string;
  text: string;
}

const clients: Client[] = [
  { name: "Nexova Tech", initials: "NX", industry: "SaaS", bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300" },
  { name: "Brightline", initials: "BL", industry: "Media", bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300" },
  { name: "Apex Digital", initials: "AD", industry: "E-Commerce", bg: "bg-sky-100 dark:bg-sky-900/40", text: "text-sky-700 dark:text-sky-300" },
  { name: "CloudPeak", initials: "CP", industry: "Cloud", bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-300" },
  { name: "Forgewave", initials: "FW", industry: "Fintech", bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-300" },
  { name: "Luminary Labs", initials: "LL", industry: "AI / ML", bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-700 dark:text-orange-300" },
  { name: "Strata Systems", initials: "SS", industry: "Enterprise", bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-700 dark:text-indigo-300" },
  { name: "Prism Creative", initials: "PC", industry: "Design", bg: "bg-pink-100 dark:bg-pink-900/40", text: "text-pink-700 dark:text-pink-300" },
  { name: "Orion Ventures", initials: "OV", industry: "Startup", bg: "bg-cyan-100 dark:bg-cyan-900/40", text: "text-cyan-700 dark:text-cyan-300" },
  { name: "Zenith Corp", initials: "ZC", industry: "Logistics", bg: "bg-teal-100 dark:bg-teal-900/40", text: "text-teal-700 dark:text-teal-300" },
];

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="group flex w-48 shrink-0 flex-col items-center gap-3 rounded-xl border border-border bg-card px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      {/* Logo monogram */}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl text-lg font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-110 ${client.bg} ${client.text}`}
      >
        {client.initials}
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-semibold text-foreground">{client.name}</span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {client.industry}
        </span>
      </div>
    </div>
  );
}

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
} satisfies Variants;

export function Clients() {
  // Duplicate list for seamless loop
  const marqueeItems = [...clients, ...clients];

  return (
    <section className="py-16">
      {/* Header */}
      <motion.div
        className="mb-10 flex flex-col items-center gap-3 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={headerVariants}
      >
        <Badge
          variant="outline"
          className="w-fit border-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
        >
          Trusted By
        </Badge>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Brands that trust us
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          From early-stage startups to growing enterprises — we've helped teams
          across industries ship faster and look better online.
        </p>
      </motion.div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          }}
        >
          {marqueeItems.map((client, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static marquee duplicate
            <ClientCard key={`${client.name}-${i}`} client={client} />
          ))}
        </motion.div>
      </div>

      {/* Trust line */}
      <motion.div
        className="mt-10 flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="h-px w-16 bg-border" />
        <p className="text-xs text-muted-foreground">
          10+ companies served across India &amp; abroad
        </p>
        <div className="h-px w-16 bg-border" />
      </motion.div>
    </section>
  );
}
