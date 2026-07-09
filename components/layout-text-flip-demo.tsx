"use client";

import { motion } from "motion/react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

export default function LayoutTextFlipDemo() {
  return (
    <div>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="We create"
          words={[
            "Digital Products",
            "SaaS Platforms",
            "Web Applications",
            "Mobile Apps",
            "AI Solutions",
            "Internal Tools",
            "Customer Portals",
            "Business Solutions",
          ]}
        />
      </motion.div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-neutral-600 dark:text-neutral-400">
        We help startups and businesses design, build, and maintain software
        that solves real problems. From customer-facing applications to internal
        business tools, we deliver fast, scalable, and reliable digital
        products.
      </p>
    </div>
  );
}
