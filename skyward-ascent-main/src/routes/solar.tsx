import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { motion } from "framer-motion";
import { Sun, Battery, Activity, Wrench, Home, Zap } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/solar")({
  head: () => ({
    ...seo({
      title: "Solar Energy \u2014 SLY Elevators",
      description:
        "Clean, efficient solar energy systems for homes and commercial properties.",
      path: "/solar",
      ogTitle: "Powering Sustainable Living",
      image: IMG.solarRoof,
    }),
  }),
  component: SolarPage,
});

const services = [
  {
    icon: Sun,
    t: "Solar Panel Installation",
    d: "Premium panels with optimized roof and ground mounts.",
  },
  {
    icon: Zap,
    t: "Hybrid Solar Systems",
    d: "Grid + solar + battery for uninterrupted power.",
  },
  {
    icon: Home,
    t: "Off-Grid Solutions",
    d: "Energy independence for homes and remote sites.",
  },
  {
    icon: Battery,
    t: "Battery Storage",
    d: "Lithium battery banks sized for your load profile.",
  },
  {
    icon: Activity,
    t: "Smart Monitoring",
    d: "Real-time mobile dashboards and performance alerts.",
  },
  {
    icon: Wrench,
    t: "Maintenance & Support",
    d: "Scheduled servicing and rapid technical response.",
  },
];

function SolarPage() {
  return (
    <>
      <PageHero
        eyebrow="Solar Energy"
        title="Powering Sustainable Living"
        subtitle="Reliable, efficient, and clean renewable energy systems engineered to lower bills and secure your power."
        image={IMG.solarRoof}
      />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-7 relative overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--brand-gold), transparent 70%)",
                  opacity: 0.2,
                }}
              />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <s.icon size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden glass"
          >
            <img
              src={IMG.solarPanels}
              alt="Solar panels"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              Cleaner power. Lower bills. Total reliability.
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Lower electricity bills",
                "Energy independence from the grid",
                "Eco-friendly, zero-emission power",
                "Reliable battery backup systems",
                "Smart real-time monitoring",
              ].map((t) => (
                <li key={t} className="flex gap-3 items-start">
                  <span
                    className="h-2 w-2 rounded-full bg-gold mt-2 shrink-0"
                    style={{ boxShadow: "0 0 10px var(--brand-gold)" }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
