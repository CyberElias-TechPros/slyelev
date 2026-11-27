import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE } from "@/components/motion";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40 ken-burns"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-primary mb-5"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="h-px bg-primary"
            />{" "}
            {eyebrow}
          </motion.p>
        )}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="text-5xl md:text-7xl font-bold text-gradient max-w-4xl leading-[1.05]"
          >
            {title}
          </motion.h1>
        </div>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: EASE }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
