"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { site } from "@/data/site";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl font-semibold text-ink sm:text-4xl">
      {display}+
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:gap-16"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            About Me
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
            {site.about}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5">
              <Counter value={stat.value} />
              <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
