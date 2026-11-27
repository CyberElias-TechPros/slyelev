import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Cpu,
  Leaf,
  Zap,
  ShieldCheck,
  Wrench,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/elevators")({
  head: () => ({
    ...seo({
      title: "Elevator Systems \u2014 SLY Elevators",
      description:
        "Passenger, freight, panoramic, MRL, and hydraulic elevators engineered for safety and intelligence.",
      path: "/elevators",
      ogTitle: "Engineering Vertical Intelligence",
      image: IMG.elevatorPanoramic,
    }),
  }),
  component: ElevatorPage,
});

const types = [
  "Passenger Elevators",
  "Cargo Elevators",
  "Hospital Lifts",
  "Dumbwaiters",
  "Panoramic Glass Elevators",
  "Hydraulic Systems",
  "MRL Elevators",
];
const features = [
  {
    icon: Cpu,
    t: "Smart Controls",
    d: "AI-aware dispatch, destination control, mobile integration.",
  },
  {
    icon: Leaf,
    t: "Energy Efficiency",
    d: "Regenerative drives that recover and reuse power.",
  },
  {
    icon: Zap,
    t: "Smooth Operation",
    d: "Precision ride quality across all speeds.",
  },
  {
    icon: ShieldCheck,
    t: "Safety Systems",
    d: "Redundant brakes, sensors, and emergency comms.",
  },
  {
    icon: Phone,
    t: "Emergency Support",
    d: "Built-in remote monitoring and rapid response.",
  },
  {
    icon: Wrench,
    t: "24/7 Maintenance",
    d: "Proactive servicing by certified engineers.",
  },
];
const faqs = [
  {
    q: "How long does installation take?",
    a: "Most projects complete in 4–8 weeks depending on shaft readiness and elevator type.",
  },
  {
    q: "Do you modernize old elevators?",
    a: "Yes — we upgrade controls, drives, cabins, and safety systems on existing lifts.",
  },
];

function ElevatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Elevator Systems"
        title="Engineering Vertical Intelligence"
        subtitle="Premium elevator systems tailored for modern buildings and intelligent infrastructure — designed in collaboration with global partners."
        image={IMG.elevatorPanoramic}
      />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden glass"
          >
            <img
              src={IMG.elevatorInterior}
              alt="Elevator interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
              — Types We Engineer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              From dumbwaiters to panoramic glass — every floor, every purpose.
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {types.map((t) => (
                <li key={t} className="glass rounded-xl px-4 py-3 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-12 max-w-3xl">
            Features built into every cabin we deliver.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-2xl p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="font-semibold mb-2">{f.t}</h3>
                <p className="text-sm text-muted-foreground">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-10 text-center">
            FAQ
          </h2>
          {faqs.map((f) => (
            <Accordion key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </>
  );
}

export function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl mb-3 overflow-hidden card-lift">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          className={`text-primary transition-transform ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
          {a}
        </p>
      </motion.div>
    </div>
  );
}
