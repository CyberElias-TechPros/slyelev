import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/glass")({
  head: () => ({
    meta: [
      { title: "Glass Partitions — SLY Elevators" },
      { name: "description", content: "Frameless, acoustic, smart, and decorative glass partition systems for luxury interiors." },
      { property: "og:title", content: "Modern Spaces Through Transparency" },
      { property: "og:description", content: "Architectural glass partitions for the modern workplace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GlassPage,
});

const items = ["Frameless Office Glass","Sliding Glass Doors","Smart Switchable Glass","Acoustic Glass","Tempered Safety Glass","Decorative Glass Systems"];
const benefits = ["Modern aesthetics","Sound control","Space optimization","Natural lighting","Premium finish","Energy efficient"];

function GlassPage() {
  return (
    <>
      <PageHero
        eyebrow="Glass Partition Systems"
        title="Modern Spaces Through Transparency"
        subtitle="Our glass partition systems combine modern aesthetics with durable engineering to create elegant, light-filled, functional spaces."
        image={IMG.glassOffice}
      />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-6">
          {items.map((title, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group relative rounded-3xl overflow-hidden glass h-72">
              <img src={[IMG.glassFrameless, IMG.glassPartition, IMG.glassMeeting, IMG.glassOffice, IMG.glassFrameless, IMG.glassPartition][i]} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="relative h-full flex items-end p-8">
                <h3 className="text-2xl font-semibold">{title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl glass-strong rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-10 text-center">Benefits engineered into every panel.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b} className="glass rounded-xl p-5 text-center font-medium">{b}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
