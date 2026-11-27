import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  ShieldCheck,
  Cpu,
  Leaf,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CountUp } from "@/components/motion";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...seo({
      title: "About \u2014 SLY Elevators",
      description:
        "Engineering the future of smart infrastructure. 20+ years of elevator, glass, and solar excellence in Nigeria.",
      path: "/about",
      ogTitle: "About SLY Elevators",
      image: IMG.skyscraper,
    }),
  }),
  component: AboutPage,
});

const values = [
  { icon: Sparkles, label: "Innovation" },
  { icon: ShieldCheck, label: "Safety" },
  { icon: Cpu, label: "Precision" },
  { icon: Leaf, label: "Sustainability" },
  { icon: Award, label: "Reliability" },
];

const stats = [
  { n: 1500, l: "Installations" },
  { n: 266, l: "Global Partners" },
  { n: 20, l: "Years Experience" },
  { n: 110, l: "Engineers" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Engineering the Future of Smart Infrastructure"
        subtitle="At SLY ELEVATORS, we redefine modern engineering through innovation, safety, and sustainability — serving homes, hotels, hospitals, and commercial developments across Nigeria."
        image={IMG.skyscraper}
      />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10"
          >
            <Target className="text-primary mb-4" size={28} />
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              Deliver innovative engineering solutions with precision and
              reliability — empowering modern infrastructure across Africa.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-3xl p-10"
          >
            <Eye className="text-primary mb-4" size={28} />
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Become Africa's leading smart engineering solutions provider —
              building intelligent vertical mobility, transparent spaces, and
              clean energy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 text-center">
            — Our Values
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gradient text-center mb-14">
            Principles engineered into every project.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <v.icon className="mx-auto text-primary mb-3" size={26} />
                <div className="font-semibold">{v.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl glass-strong rounded-3xl p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-4xl md:text-5xl font-bold text-gradient-gold">
                <CountUp to={s.n} suffix="+" />
              </div>
              <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden"
          >
            <img
              src={IMG.engineer}
              alt="Engineering team"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              A team that builds the skyline.
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Certified engineers and project managers",
                "International equipment partnerships",
                "Custom design & feasibility studies",
                "Lifetime maintenance support",
                "Compliance with global safety standards",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle2
                    className="text-primary shrink-0 mt-0.5"
                    size={18}
                  />{" "}
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
