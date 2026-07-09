import {
  Building2,
  GraduationCap,
  HeartHandshake,
  UtensilsCrossed,
} from "lucide-react";
import type * as React from "react";

import { Card } from "@/components/ui/card";
import StatsForLanding from "./status-for-landing";

type Sector = "hospitality" | "education" | "enterprise" | "welfare";

type Client = {
  name: string;
  sector: Sector;
};

const SECTORS: Record<
  Sector,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  hospitality: { label: "Hospitality", icon: UtensilsCrossed },
  education: { label: "Education", icon: GraduationCap },
  enterprise: { label: "Enterprise & Services", icon: Building2 },
  welfare: { label: "Social Welfare", icon: HeartHandshake },
};

const CLIENTS: Client[] = [
  { name: "Skyfall Rooftop Restaurant", sector: "hospitality" },
  { name: "The Tables Restaurant", sector: "hospitality" },
  { name: "London Dreams Restaurant", sector: "hospitality" },
  { name: "SSDM College", sector: "education" },
  { name: "RDS College", sector: "education" },
  { name: "Maa Sharda College", sector: "education" },
  { name: "SGP College", sector: "education" },
  { name: "SDM Services", sector: "enterprise" },
  { name: "Hitech Solution Pvt. Ltd.", sector: "enterprise" },
  { name: "Radhika Jamuna Foundation", sector: "welfare" },
  { name: "Kanya Vivah Jan Kalyan Society", sector: "welfare" },
];

function initials(name: string) {
  const skip = new Set([
    "and",
    "of",
    "the",
    "pvt",
    "pvt.",
    "private",
    "ltd",
    "ltd.",
    "limited",
  ]);
  const parts = name
    .replace(/[.,]/g, "")
    .split(" ")
    .filter((w) => w && !skip.has(w.toLowerCase()));
  const chosen =
    parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : [parts[0]];
  return chosen.map((w) => w[0]?.toUpperCase()).join("");
}

function ClientSeal({ name }: { name: string }) {
  return (
    <div className="relative h-14 w-14 shrink-0">
      <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-primary/40" />
      <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold tracking-wide text-primary-foreground">
        {initials(name)}
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <Card className="group/client relative gap-4 rounded-2xl border-border/60 py-5 hover:border-primary/40">
      <div className="flex items-center gap-4 px-5">
        <ClientSeal name={client.name} />
        <div className="min-w-0">
          <p className="truncate font-heading text-[15px] font-medium leading-snug tracking-tight text-foreground">
            {client.name}
          </p>
        </div>
      </div>
    </Card>
  );
}

function SectorGroup({
  sector,
  clients,
}: {
  sector: Sector;
  clients: Client[];
}) {
  const { label, icon: Icon } = SECTORS[sector];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        <h3 className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </h3>
        <span className="h-px w-full bg-border/70" aria-hidden />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard key={client.name} client={client} />
        ))}
      </div>
    </div>
  );
}

function ManyMoreCard() {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 py-6 text-center">
      <p className="font-heading text-sm font-medium tracking-wide text-muted-foreground">
        &amp; many more
      </p>
    </div>
  );
}

export function WhyICanBeTrusted() {
  const bySector = (sector: Sector) =>
    CLIENTS.filter((c) => c.sector === sector);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Our Clients
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Trusted by organisations we&apos;ve worked with
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          From rooftop dining rooms to college campuses, service firms to
          welfare societies — every name below is a client we&apos;ve delivered
          for, listed here as a matter of record.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {(Object.keys(SECTORS) as Sector[]).map((sector) => {
          const clients = bySector(sector);
          if (clients.length === 0) return null;
          return <SectorGroup key={sector} sector={sector} clients={clients} />;
        })}
        <ManyMoreCard />
      </div>
      <StatsForLanding />
    </section>
  );
}
