import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { motion } from "framer-motion";
import { Building2, Sparkles, Sun, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/services")({
  head: () => ({
    ...seo({
      title: "Services \u2014 SLY Elevators",
      description:
        "Smart engineering services built for the future. Elevators, glass partitions, and solar energy systems.",
      path: "/services",
      ogTitle: "Services \u2014 SLY Elevators",
      image: IMG.skyline,
    }),
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Building2,
    title: "Elevator Systems",
    text: "Passenger, freight, panoramic, and smart lifts engineered for tomorrow's buildings.",
    img: IMG.elevatorPanoramic,
    href: "/elevators",
  },
  {
    icon: Sparkles,
    title: "Glass Partitions",
    text: "Frameless, acoustic, decorative, and safety glass systems for modern interiors.",
    img: IMG.glassPartition,
    href: "/glass",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    text: "Hybrid, off-grid, and smart renewable energy systems with battery storage.",
    img: IMG.solarRoof,
    href: "/solar",
  },
];

const process = [
  {
    n: "01",
    t: "Consultation",
    d: "We map your building, requirements, and ambitions in detail.",
  },
  {
    n: "02",
    t: "Design & Engineering",
    d: "Custom engineering with feasibility studies and 3D plans.",
  },
  {
    n: "03",
    t: "Installation & Delivery",
    d: "Professional execution, certification, and lifetime support.",
  },
];

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Smart Engineering Services Built for the Future"
        subtitle="From vertical mobility to architectural transparency and renewable energy — a single, precision-driven partner for modern infrastructure."
        image={IMG.skyline}
      />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden glass min-h-[26rem]"
            >
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl glass-strong text-primary mb-4">
                  <s.icon size={22} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground mb-4">{s.text}</p>
                <Link
                  to={s.href}
                  className="inline-flex items-center gap-2 text-primary font-medium"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
            — Process
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-14 max-w-3xl">
            From blueprint to ribbon-cutting, engineered in three precise acts.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-strong rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="text-7xl font-display font-bold text-primary/15 absolute -top-2 right-4">
                  {p.n}
                </div>
                <div className="relative">
                  <div className="text-sm tracking-wider text-primary mb-2">
                    STEP {p.n}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{p.t}</h3>
                  <p className="text-muted-foreground text-sm">{p.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
