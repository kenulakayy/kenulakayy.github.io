import { useEffect, useRef, useState } from "react";

const PARAGRAPHS = [
  "At 11, Kenula was all about EDM. By 14, he discovered his heart had other plans—music production became his world, and he's been crafting sounds ever since.",
  "What began with inspiration from artists like Ed Sheeran, FINNEAS, Billie Eilish, Jacob Collier, Lauv has grown into something uniquely his own…",
  "From YouTube originals and covers in 2020 to \"Now That You Know\" in 2023, and most recently the \"Bedroom\" EP in August 2025—each release proves he's not here to play it safe.",
  "Here's the thing about Kenula: he's obsessed with quality…",
  "But strip away the technical skills and genre-hopping—what really drives him is that moment when someone connects with the music he's produced on a soul level.",
  "Kenula doesn't do comfort zones. He's constantly chasing sounds he's never made before, always asking \"what if?\" instead of \"why not?\"",
  "The mission stays the same: create music that makes people feel less alone…",
  "Ready to see what happens when authentic meets ambitious? Kenula's story is just getting started.",
];

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const [played, setPlayed] = useState(false);
  const [shown, setShown] = useState<boolean[]>(() => Array(PARAGRAPHS.length + 1).fill(false));

  useEffect(() => {
    const onScroll = () => {
      const section = ref.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY;
      // parallax
      if (bgRef.current && rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (scrollY - section.offsetTop) * 0.15;
        bgRef.current.style.transform = `translateY(${offset}px) scale(1.2)`;
      }
      if (!played && rect.top < window.innerHeight * 0.8) {
        setPlayed(true);
        // heading first
        setShown((prev) => {
          const c = [...prev];
          c[0] = true;
          return c;
        });
        PARAGRAPHS.forEach((_, i) => {
          setTimeout(() => {
            setShown((prev) => {
              const c = [...prev];
              c[i + 1] = true;
              return c;
            });
          }, 500 + i * 250);
        });
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [played]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-8 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src="https://kenulakayy.github.io/images/ABOUT-COVER_PAGE-1920.webp"
          srcSet="https://kenulakayy.github.io/images/ABOUT-COVER_PAGE-1920.webp 1920w, https://kenulakayy.github.io/images/ABOUT-COVER_PAGE-2880.webp 2880w"
          alt="About background"
          className="w-full h-full object-cover scale-[1.2] will-change-transform transition-transform duration-700"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="relative z-10 max-w-[1000px] w-[92%] md:w-[90%] text-center">
        <h2
          className={`font-display text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8 transition-all duration-700 ${
            shown[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          ABOUT
        </h2>
        <div className="space-y-4 md:space-y-5">
          {PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className={`font-mono-body font-light text-[0.95rem] md:text-lg leading-[1.65] md:leading-[1.8] transition-all duration-700 ${
                shown[i + 1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
