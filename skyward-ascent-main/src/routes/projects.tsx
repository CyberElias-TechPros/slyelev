import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/projects")({
  head: () => ({
    ...seo({
      title: "Projects \u2014 SLY Elevators",
      description:
        "Engineering excellence across Nigeria \u2014 hotels, corporate offices, residential and commercial projects.",
      path: "/projects",
      ogTitle: "Projects \u2014 SLY Elevators",
      image: IMG.skyline,
    }),
  }),
  component: ProjectsPage,
});

const categories = [
  "All",
  "Hotels",
  "Corporate",
  "Residential",
  "Commercial",
] as const;
type Cat = (typeof categories)[number];

const projects: { title: string; cat: Cat; img: string }[] = [
  { title: "Panoramic Hotel Lift", cat: "Hotels", img: IMG.elevatorPanoramic },
  { title: "Corporate Glass Floor", cat: "Corporate", img: IMG.glassOffice },
  {
    title: "Residential Solar Rooftop",
    cat: "Residential",
    img: IMG.solarHome,
  },
  {
    title: "Hospital Lift System",
    cat: "Commercial",
    img: IMG.elevatorInterior,
  },
  { title: "Frameless Meeting Suite", cat: "Corporate", img: IMG.glassMeeting },
  { title: "Hybrid Solar Plant", cat: "Commercial", img: IMG.solarFarm },
  { title: "Hotel Lobby Modernization", cat: "Hotels", img: IMG.hotel },
  {
    title: "Smart Office Partitions",
    cat: "Corporate",
    img: IMG.glassPartition,
  },
  { title: "Smart MRL Elevator", cat: "Commercial", img: IMG.smartElevator },
];

function ProjectsPage() {
  const [cat, setCat] = useState<Cat>("All");
  const filtered =
    cat === "All" ? projects : projects.filter((p) => p.cat === cat);
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Engineering Excellence Across Nigeria"
        subtitle="A selection of recent installations — from skyline-defining hotels to off-grid residential solar."
        image={IMG.skyline}
      />

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${cat === c ? "bg-primary text-primary-foreground cyan-glow" : "glass hover:border-primary/50"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl columns-1 sm:columns-2 lg:columns-3 gap-5">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group break-inside-avoid mb-5 relative rounded-2xl overflow-hidden glass cursor-pointer"
              style={{
                aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "4/3",
              }}
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-xs text-primary tracking-wider uppercase">
                  {p.cat}
                </p>
                <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
