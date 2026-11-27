import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sly-logo.png";
import { Magnetic } from "@/components/motion";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useLocation().pathname;

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hide when scrolling down past the hero, reveal instantly on scroll-up.
      setHidden(y > 160 && y > last && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
        hidden ? "-translate-y-[130%]" : "translate-y-0",
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500",
            scrolled ? "glass-strong" : "glass",
          )}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="SLY Elevators"
              className="h-9 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active =
                l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors group",
                    active
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  <span>{l.label}</span>
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-1/2 bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-primary transition-all duration-300 group-hover:w-1/2" />
                  )}
                </Link>
              );
            })}
          </div>

          <Magnetic className="hidden md:inline-block" strength={0.2}>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold magnetic-btn hover:cyan-glow btn-sheen transition-all"
            >
              Get Quote
            </Link>
          </Magnetic>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-lg text-foreground/85 hover:bg-white/5"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * links.length, duration: 0.3 }}
                >
                  <Link
                    to="/quote"
                    onClick={() => setOpen(false)}
                    className="mt-2 block text-center rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold btn-sheen"
                  >
                    Get Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
