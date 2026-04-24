"use client";

import { motion, type Variants } from "motion/react";
import {
  IconCodeCircle2Filled,
  IconLayout2Filled,
  IconDeviceMobileFilled,
  IconSearchFilled,
  IconCloudComputingFilled,
  IconChartDotsFilled,
  IconBulbFilled,
  IconPhoneCallFilled,
  IconWorldFilled,
  IconSettingsFilled,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

interface Service {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  color: string;
  iconBg: string;
}

const services: Service[] = [
  {
    icon: IconCodeCircle2Filled,
    title: "Web Development",
    tagline: "Fast. Scalable. Beautiful.",
    description: "High-performance websites & apps built with modern stacks.",
    color: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
  },
  {
    icon: IconLayout2Filled,
    title: "UI/UX Design",
    tagline: "Interfaces that convert.",
    description: "Figma-first design systems that are accessible and polished.",
    color: "text-pink-600 dark:text-pink-400",
    iconBg: "bg-pink-100 dark:bg-pink-900/40",
  },
  {
    icon: IconDeviceMobileFilled,
    title: "Mobile Apps",
    tagline: "iOS & Android, done right.",
    description: "Cross-platform React Native apps that feel truly native.",
    color: "text-sky-600 dark:text-sky-400",
    iconBg: "bg-sky-100 dark:bg-sky-900/40",
  },
  {
    icon: IconSearchFilled,
    title: "SEO & Marketing",
    tagline: "Rank higher. Grow faster.",
    description: "Technical SEO and paid campaigns that drive real traffic.",
    color: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
  },
  {
    icon: IconCloudComputingFilled,
    title: "Cloud & DevOps",
    tagline: "Deploy with confidence.",
    description: "Automated pipelines and cloud infra that scale with you.",
    color: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  {
    icon: IconChartDotsFilled,
    title: "Data & Analytics",
    tagline: "Decisions backed by data.",
    description: "Dashboards and pipelines that turn raw data into insight.",
    color: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
  },
  {
    icon: IconBulbFilled,
    title: "AI & ML Solutions",
    tagline: "Smarter products, faster.",
    description: "LLM integrations and AI features that give you an edge.",
    color: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
  },
  {
    icon: IconPhoneCallFilled,
    title: "IVR Solutions",
    tagline: "Automate your call flow.",
    description: "Smart IVR systems with CRM integration and call analytics.",
    color: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-100 dark:bg-teal-900/40",
  },
  {
    icon: IconWorldFilled,
    title: "E-Commerce",
    tagline: "Sell more. Everywhere.",
    description: "Full-stack stores with payment gateways and inventory sync.",
    color: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900/40",
  },
  {
    icon: IconSettingsFilled,
    title: "Tech Consulting",
    tagline: "Strategy before code.",
    description: "Architecture reviews and audits to guide your tech calls.",
    color: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/40",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} satisfies Variants;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} satisfies Variants;

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${service.iconBg} ${service.color}`}
      >
        <Icon className="size-5" />
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-bold text-foreground">{service.title}</h3>
        <span className={`text-xs font-semibold ${service.color}`}>{service.tagline}</span>
      </div>

      <p className="text-xs leading-snug text-muted-foreground">{service.description}</p>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="py-16">
      {/* Header */}
      <motion.div
        className="mb-10 flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <Badge
          variant="outline"
          className="w-fit border-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
        >
          What We Do
        </Badge>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Services built for growth
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          From idea to launch — we cover every layer of the stack so you can
          focus on building a business, not chasing vendors.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
      >
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </motion.div>
    </section>
  );
}
