import { useEffect, useRef, useState } from "react";

const PARAGRAPHS = [
  "Kenula began his musical journey at just 11 years old, initially producing EDM before eventually exploring new creative directions. He later shifted his focus towards Pop, Singer/Songwriter, R&B, and Indie, continuing to grow and experiment with different sounds.",
  "Currently based in Melbourne, Kenula holds years of industry experience across a number of productions and recordings, with his main vision being to create something unique, while thoughtfully bringing together and complementing the artist’s own creative vision. He has also been singing and writing originals and covers on YouTube since 2020, before releasing his debut single “Now That You Know” on streaming platforms in 2023 and with his most recent release being the 6 song EP “Bedroom”, released in 2025.",
  "Influenced by artists and producers such as Ed Sheeran, FINNEAS, Mike Sabbath, Jeremy Zucker, Lauv, Lizzie McAlpine and Asha Banks, Kenula focuses on evoking the right emotion through his productions and compositions. As he continues to evolve as a Music Producer, Audio Engineer and Singer/Songwriter, he is excited to see where his journey in music takes him.",
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
          src="/images/ABOUT-COVER_PAGE-1920.webp"
          srcSet="/images/ABOUT-COVER_PAGE-1920.webp 1920w, /images/ABOUT-COVER_PAGE-2880.webp 2880w"
          alt="About background"
          className="w-full h-full object-cover scale-[1.2] will-change-transform transition-transform duration-700"
          loading="lazy"
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
