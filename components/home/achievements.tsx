"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, type Variants } from "motion/react";
import {
  IconBoltFilled,
  IconStarFilled,
  IconHeartFilled,
  IconTrophyFilled,
  IconClockFilled,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: IconBoltFilled,
    value: 50,
    suffix: "+",
    label: "Projects Shipped",
    description: "Delivered on time, every time",
    color: "text-primary",
  },
  {
    icon: IconStarFilled,
    value: 95,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on post-project reviews",
    color: "text-yellow-500",
  },
  {
    icon: IconHeartFilled,
    value: 20,
    suffix: "+",
    label: "Happy Clients",
    description: "Across industries worldwide",
    color: "text-blue-500",
  },
  {
    icon: IconTrophyFilled,
    value: 10,
    suffix: "+",
    label: "Awards & Recognition",
    description: "Industry-recognized excellence",
    color: "text-orange-500",
  },
  {
    icon: IconClockFilled,
    value: 3,
    suffix: "+",
    label: "Years of Experience",
    description: "Building digital products",
    color: "text-purple-500",
  },
  {
    icon: IconThumbUpFilled,
    value: 100,
    suffix: "%",
    label: "On-Time Delivery",
    description: "Never missed a deadline",
    color: "text-emerald-500",
  },
];

function CountUp({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });
    return () => ctrl.stop();
  }, [inView, target]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} satisfies Variants;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} satisfies Variants;

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
} satisfies Variants;

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16">
      {/* Header */}
      <motion.div
        className="mb-10 flex flex-col items-center gap-3 text-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <Badge
          variant="outline"
          className="w-fit border-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
        >
          By The Numbers
        </Badge>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Results that speak for themselves
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Every milestone reflects our commitment to delivering exceptional
          digital experiences that actually move the needle.
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <motion.div
                animate={inView ? { scale: [1, 1.15, 1] } : {}}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
                className={`rounded-full bg-muted p-2.5 ${stat.color}`}
              >
                <Icon className="size-5" />
              </motion.div>

              <div className="flex flex-col gap-0.5">
                <span className="text-2xl font-extrabold leading-none text-foreground">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </span>
                <span className="text-sm font-semibold text-foreground/80">
                  {stat.label}
                </span>
                <span className="text-[11px] leading-snug text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom accent bar */}
      <motion.div
        className="mt-10 h-1 w-full overflow-hidden rounded-full bg-muted"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={inView ? { width: "95%" } : {}}
          transition={{ delay: 1.0, duration: 1.4, ease: "easeOut" }}
        />
      </motion.div>
      <motion.p
        className="mt-2 text-right text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        95% average client satisfaction rate
      </motion.p>
    </section>
  );
}
