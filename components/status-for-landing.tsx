"use client";

import {
  IconBrandGoogle,
  IconBriefcase,
  IconShieldCheck,
  IconStarFilled,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: IconBriefcase,
    iconColor: "#2563EB",
    label: "Clutch",
    sublabel: "B2B Rating",
    badgeBg: "rgba(37,99,235,0.08)",
    badgeBorder: "rgba(37,99,235,0.25)",
    badgeText: "#2563eb",
    metric: "4.9",
    metricSuffix: "/5",
    subtext: "Verified B2B Rating",
    description:
      "Consistently recognized as a leading software engineering partner based on verified client testimonials and project delivery quality.",
    starColor: "text-blue-500",
    ratingCount: 5,
    gradient:
      "repeating-linear-gradient(135deg, rgba(37,99,235,0.06) 0px, rgba(37,99,235,0.06) 1px, transparent 1px, transparent 6px, rgba(37,99,235,0.03) 6px, rgba(37,99,235,0.03) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: IconBrandGoogle,
    iconColor: "#EA4335",
    label: "Google Reviews",
    sublabel: "Client Trust",
    badgeBg: "rgba(234,67,53,0.08)",
    badgeBorder: "rgba(234,67,53,0.25)",
    badgeText: "#c22c1e",
    metric: "5.0",
    metricSuffix: "/5",
    subtext: "Exceptional Service Rating",
    description:
      "Highly rated by our enterprise and startup clients for our transparent communication, development agility, and support.",
    starColor: "text-red-500",
    ratingCount: 5,
    gradient:
      "repeating-linear-gradient(135deg, rgba(234,67,53,0.06) 0px, rgba(234,67,53,0.06) 1px, transparent 1px, transparent 6px, rgba(234,67,53,0.03) 6px, rgba(234,67,53,0.03) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: IconShieldCheck,
    iconColor: "#059669",
    label: "Client Success",
    sublabel: "NPS Score",
    badgeBg: "rgba(5,150,105,0.08)",
    badgeBorder: "rgba(5,150,105,0.25)",
    badgeText: "#047857",
    metric: "98",
    metricSuffix: "%",
    subtext: "Net Promoter Score",
    description:
      "An outstanding satisfaction index and project delivery success rate highlighting our commitment to building long-term software solutions.",
    starColor: "text-emerald-500",
    ratingCount: 5,
    gradient:
      "repeating-linear-gradient(135deg, rgba(5,150,105,0.06) 0px, rgba(5,150,105,0.06) 1px, transparent 1px, transparent 6px, rgba(5,150,105,0.03) 6px, rgba(5,150,105,0.03) 7px, transparent 7px, transparent 12px)",
  },
];

export default function StatsForLanding() {
  return (
    <div className="flex flex-col gap-10 pt-16 border-t border-border/50">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Reviews & Ratings
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Impact in Numbers
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          See how clients and rating platforms evaluate our software consulting,
          development, and engineering services.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl p-0 border-border/60 transition-all duration-300 hover:border-primary/40"
            style={{ backgroundImage: stat.gradient }}
          >
            <CardContent className="flex h-full flex-col p-6">
              <div className="flex items-center">
                <div
                  className="inline-flex items-center gap-3 rounded-xl px-3.5 py-2"
                  style={{
                    backgroundColor: stat.badgeBg,
                    border: `1px solid ${stat.badgeBorder}`,
                  }}
                >
                  <stat.icon
                    className="size-5 shrink-0"
                    style={{ color: stat.iconColor }}
                  />
                  <div className="flex flex-col items-start leading-none">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: stat.badgeText }}
                    >
                      {stat.label}
                    </span>
                    <span className="text-muted-foreground mt-0.5 text-[10px] tracking-widest uppercase">
                      {stat.sublabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-baseline gap-0.5 text-left">
                <span className="text-foreground text-6xl font-bold tracking-tighter">
                  {stat.metric}
                </span>
                <span className="text-muted-foreground text-2xl font-medium">
                  {stat.metricSuffix}
                </span>
              </div>

              <p className="text-foreground mt-5 text-left text-sm font-semibold">
                {stat.subtext}
              </p>

              <p className="text-muted-foreground mt-2 text-left text-sm leading-relaxed">
                {stat.description}
              </p>

              <div className="mt-auto flex gap-1 pt-6">
                {Array.from({ length: stat.ratingCount }).map((_, i) => (
                  <IconStarFilled
                    key={i}
                    className={`size-5 ${stat.starColor}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
