import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionLink = motion.create(Link);
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Shield,
  Cpu,
  Leaf,
  Headphones,
  Building2,
  Sparkles,
  Sun,
  Quote,
} from "lucide-react";
import { IMG } from "@/lib/images";
import { CountUp, Magnetic, Tilt } from "@/components/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({
      title: "SLY Elevators \u2014 Elevating Modern Infrastructure",
      description:
        "Premium elevator systems, architectural glass partitions, and solar energy solutions engineered for the future.",
      path: "/",
      ogTitle: "SLY Elevators \u2014 Elevating Modern Infrastructure",
      image: IMG.heroBuilding,
    }),
  }),
  component: HomePage,
});

const MAIL_QUOTE =
  "mailto:slyelevator@gmail.com?subject=Request%20for%20Quotation";
const MAIL_VISIT =
  "mailto:slyelevator@gmail.com?subject=Book%20Site%20Visitation";

const slides = [
  {
    eyebrow: "Elevators",
    title: "Redefining Vertical Mobility",
    text: "We deliver advanced elevator systems designed for safety, comfort, reliability, and futuristic performance.",
    img: IMG.elevatorInterior,
  },
  {
    eyebrow: "Glass Partitions",
    title: "Elegant Architectural Glass Systems",
    text: "Modern frameless glass solutions crafted for luxury interiors, offices, and commercial environments.",
    img: IMG.glassOffice,
  },
  {
    eyebrow: "Solar Energy",
    title: "Powering the Future Sustainably",
    text: "Reliable solar energy systems designed to reduce electricity costs and power modern living.",
    img: IMG.solarRoof,
  },
  {
    eyebrow: "Smart Elevators",
    title: "Smart. Safe. Futuristic.",
    text: "AI-powered elevator systems built for the next generation of intelligent buildings.",
    img: IMG.smartElevator,
  },
];

function HomePage() {
  return (
    <>
      <Hero />
      <FloorIndicator />
      <AboutPreview />
      <ServicesOverview />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center pt-32 pb-20"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={IMG.heroBuilding}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 radial-glow" />
      </motion.div>

      {/* Animated elevator shaft */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-2 h-32 bg-gradient-to-b from-primary to-transparent rounded-full"
          animate={{ y: ["-10%", "110vh"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: "0 0 40px var(--brand-cyan)" }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-6 w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-primary mb-6"
        >
          <span className="h-px w-10 bg-primary" /> Smart Engineering Solutions
        </motion.p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] max-w-5xl">
          {"Elevating Modern".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{ delay: 0.1 * i, duration: 0.8 }}
              className="inline-block mr-4 text-gradient"
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block text-gradient-gold"
          >
            Infrastructure
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Premium elevator systems, architectural glass solutions, and
          sustainable solar energy — engineered for the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Magnetic strength={0.18}>
            <a
              href={MAIL_QUOTE}
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold magnetic-btn btn-sheen"
            >
              Request a Quote{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </Magnetic>
          <a
            href={MAIL_VISIT}
            className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 font-semibold magnetic-btn hover:border-primary"
          >
            Book Site Visitation
          </a>
        </motion.div>

        <HeroSlider />
      </motion.div>
    </section>
  );
}

function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(i);
  }, []);
  const s = slides[idx];
  return (
    <div className="mt-16 grid md:grid-cols-[1fr_auto] gap-6 items-end">
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-2xl p-6 md:p-8 max-w-xl"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-primary mb-3">
          {s.eyebrow}
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold mb-2">{s.title}</h3>
        <p className="text-muted-foreground text-sm md:text-base">{s.text}</p>
        <div className="mt-5 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1 rounded-full transition-all ${i === idx ? "w-10 bg-primary" : "w-4 bg-white/20"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        key={`img-${idx}`}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:block relative w-56 h-72 rounded-2xl overflow-hidden glass"
      >
        <img
          src={s.img}
          alt={s.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}

function FloorIndicator() {
  const [floor, setFloor] = useState(1);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = window.scrollY / h;
      setFloor(Math.min(7, Math.max(1, Math.floor(p * 7) + 1)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 glass rounded-full px-2 py-4">
      <span
        className="text-[10px] tracking-[0.2em] text-muted-foreground rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        FLOOR
      </span>
      <div className="text-primary font-display font-bold text-lg">
        {String(floor).padStart(2, "0")}
      </div>
      <div className="h-24 w-px bg-border relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-px bg-primary transition-all duration-500"
          style={{
            height: `${(floor / 7) * 100}%`,
            boxShadow: "0 0 10px var(--brand-cyan)",
          }}
        />
      </div>
    </div>
  );
}

function AboutPreview() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
            — About SLY
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight">
            Engineering trust into every floor we deliver.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At SLY ELEVATORS, we are more than an elevator company — we are a
            complete engineering solutions provider specializing in elevators &
            lift systems, glass partition systems, and solar energy
            installations.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            With over 20 years of expertise, we deliver world-class engineering
            built on innovation, safety, and sustainability.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-primary font-semibold group"
          >
            Discover our story{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden glass"
        >
          <img
            src={IMG.skyscraper}
            alt="Modern skyscraper"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-5">
            <div className="text-3xl font-bold text-gradient-gold">
              <CountUp to={20} suffix="+" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Years engineering the skyline
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Building2,
    title: "Elevators",
    text: "Passenger, freight, panoramic, and intelligent lift systems.",
    img: IMG.elevatorPanoramic,
    href: "/elevators",
  },
  {
    icon: Sparkles,
    title: "Glass Partitions",
    text: "Frameless, acoustic, and smart architectural glass.",
    img: IMG.glassPartition,
    href: "/glass",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    text: "Hybrid, off-grid, and smart renewable energy systems.",
    img: IMG.solarRoof,
    href: "/solar",
  },
];

function ServicesOverview() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
              — What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient max-w-2xl leading-tight">
              Three disciplines. One precision standard.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary group"
          >
            All services{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Tilt key={s.title} max={6} className="h-[28rem]">
              <MotionLink
                to={s.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative h-full rounded-3xl overflow-hidden glass cursor-pointer"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl glass-strong text-primary mb-4 group-hover:cyan-glow transition-shadow">
                    <s.icon size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.text}</p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    Explore{" "}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </MotionLink>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

const whys = [
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Always available for maintenance and emergency response.",
  },
  {
    icon: Shield,
    title: "Safety Standards",
    text: "International engineering compliance and certifications.",
  },
  {
    icon: Cpu,
    title: "Smart Technology",
    text: "Advanced engineering innovation for intelligent buildings.",
  },
  {
    icon: Leaf,
    title: "Sustainable Solutions",
    text: "Eco-friendly infrastructure for the next generation.",
  },
];

function WhyChooseUs() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
            — Why SLY
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Built to outlast trends. Engineered for trust.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whys.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative group p-6 rounded-2xl glass hover:border-primary/50 transition-all"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:cyan-glow transition-shadow">
                <w.icon size={22} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{w.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {w.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { num: 20, suffix: "+", label: "Years Experience" },
  { num: 1500, suffix: "+", label: "Installations" },
  { num: 110, suffix: "+", label: "Engineers" },
  { num: 2000, suffix: "+", label: "Projects" },
  { num: 50, suffix: "+", label: "Awards" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (ents) => {
        if (ents[0].isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const e = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(to * e));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl glass-strong rounded-3xl p-10 md:p-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient">
                <Counter to={s.num} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "SLY delivered a panoramic elevator system that became the centerpiece of our hotel lobby. Flawless engineering.",
    name: "Adaeze O.",
    role: "GM, Luxury Hotel — Lagos",
  },
  {
    quote:
      "Their frameless glass partitions transformed our corporate floor into a modern, light-filled workspace.",
    name: "Tunde A.",
    role: "Operations Director, FinTech",
  },
  {
    quote:
      "Our hybrid solar installation cut our energy bills by 60%. Reliable, clean, and professionally installed.",
    name: "Mrs. Bello",
    role: "Residential Client, Abuja",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setI((p) => (p + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
          — Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-12">
          Trusted across hotels, offices, and homes.
        </h2>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-10"
        >
          <Quote className="mx-auto mb-6 text-primary" size={32} />
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            "{t.quote}"
          </p>
          <div className="mt-8">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-muted-foreground">{t.role}</div>
          </div>
        </motion.div>
        <div className="mt-6 flex justify-center gap-1.5">
          {testimonials.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="relative mx-auto max-w-6xl glass-strong rounded-3xl p-12 md:p-20 text-center overflow-hidden">
        <div className="absolute inset-0 radial-glow opacity-60" />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Ready to Elevate Your Project?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Let our engineers design a smart, safe, and sustainable solution
            tailored to your building.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.18}>
              <a
                href={MAIL_QUOTE}
                className="inline-block rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold magnetic-btn btn-sheen"
              >
                Request a Quote
              </a>
            </Magnetic>
            <a
              href={MAIL_VISIT}
              className="rounded-full glass-strong px-8 py-4 font-semibold magnetic-btn hover:border-primary"
            >
              Book Site Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
