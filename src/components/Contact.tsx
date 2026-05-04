import { useEffect, useRef, useState } from "react";
import { SOCIALS } from "@/data/projects";

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setShown(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    <h2 key="h" className="contact-heading font-display text-4xl md:text-5xl">LET'S GET IN TOUCH</h2>,
    <p key="t" className="contact-text mt-5 text-base md:text-lg">
      Feel free to reach out for collaborations, projects, or anything music-related.
    </p>,
    <div key="links" className="contact-links mt-6 flex flex-col gap-2.5">
      <a href="mailto:kenulak@icloud.com" className="text-foreground hover:text-brand-gold transition-colors text-base md:text-lg">
        kenulak@icloud.com
      </a>
      <a href="tel:+94770185211" className="text-foreground hover:text-brand-gold transition-colors text-base md:text-lg">
        +94 77 018 5211
      </a>
    </div>,
    <div key="social" className="social-icons mt-8 flex justify-center gap-4 md:gap-[18px]">
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="icon-mask"
          style={{
            WebkitMaskImage: `url(/icons/${s.name}.svg)`,
            maskImage: `url(/icons/${s.name}.svg)`,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = s.color)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "")}
        />
      ))}
    </div>,
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative z-0 min-h-screen flex items-center justify-center px-5 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover brightness-[0.35]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/CONTACT_BG_FINAL_2_POSTER.webp"
        >
          <source src="/videos/CONTACT_BG_FINAL_2.mp4" type="video/mp4" />
          <source src="/videos/CONTACT_BG_FINAL_2.webm" type="video/webm" />
        </video>
      </div>

      <div className="relative z-10 text-center max-w-[700px] mx-auto px-5">
        {items.map((node, i) => (
          <div
            key={i}
            className="transition-all duration-700"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 250}ms`,
            }}
          >
            {node}
          </div>
        ))}
      </div>

      <footer className="absolute bottom-5 left-0 w-full text-center text-xs md:text-sm text-muted-foreground z-10">
        <p>
          © 2026 Kenula Kandanaarachchi. <span className="text-brand-gold">All rights reserved.</span>
        </p>
      </footer>
    </section>
  );
};

export default Contact;
