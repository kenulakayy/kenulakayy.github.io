import { useEffect, useRef, useState, useCallback } from "react";
import type { Project } from "@/data/projects";

type Props = {
  id: "studio-projects" | "creative-projects";
  title: string;
  slides: Project[][];
  cardAspect?: string;
};

const AUTO_START_DELAY = 10000;
const SLIDE_INTERVAL = 10000;
const LAST_SLIDE_PAUSE = 10000;

const ProjectsSection = ({ id, title, slides, cardAspect = "1 / 1" }: Props) => {
  const [current, setCurrent] = useState(0);
  const [headingShown, setHeadingShown] = useState(false);
  const [dotsShown, setDotsShown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const visibleRef = useRef(false);
  const hoverRef = useRef(false);
  const startTimeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const currentRef = useRef(0);

  useEffect(() => { currentRef.current = current; }, [current]);

  const stopAuto = () => {
    if (startTimeoutRef.current) { clearTimeout(startTimeoutRef.current); startTimeoutRef.current = null; }
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (pauseTimeoutRef.current) { clearTimeout(pauseTimeoutRef.current); pauseTimeoutRef.current = null; }
  };

  const startAuto = () => {
    if (startTimeoutRef.current || intervalRef.current || pauseTimeoutRef.current) return;
    startTimeoutRef.current = window.setTimeout(() => {
      startTimeoutRef.current = null;
      const tick = () => {
        if (currentRef.current < slides.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
          pauseTimeoutRef.current = window.setTimeout(() => {
            pauseTimeoutRef.current = null;
            setCurrent(0);
            if (visibleRef.current && !hoverRef.current) {
              intervalRef.current = window.setInterval(tick, SLIDE_INTERVAL);
            }
          }, LAST_SLIDE_PAUSE);
        }
      };
      intervalRef.current = window.setInterval(tick, SLIDE_INTERVAL);
    }, AUTO_START_DELAY);
  };

  const resetAuto = () => {
    stopAuto();
    if (visibleRef.current && !hoverRef.current) startAuto();
  };

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      const fadeIn = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      if (fadeIn) {
        setHeadingShown(true);
        setTimeout(() => setDotsShown(true), 800);
      }
      if (visible && !visibleRef.current) {
        visibleRef.current = true;
        startAuto();
      } else if (!visible && visibleRef.current) {
        visibleRef.current = false;
        stopAuto();
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      stopAuto();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number) => { setCurrent(i); resetAuto(); };
  const next = useCallback(() => { setCurrent((c) => Math.min(c + 1, slides.length - 1)); resetAuto(); }, [slides.length]);
  const prev = useCallback(() => { setCurrent((c) => Math.max(c - 1, 0)); resetAuto(); }, []);

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    // Only trigger if horizontal swipe is dominant and > 50px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  }, [next, prev]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-20 md:py-24 px-6 md:px-8"
    >
      <h2
        className={`font-display text-center text-5xl md:text-7xl lg:text-8xl mb-8 md:mb-10 transition-all duration-1000 ${
          headingShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {title}
      </h2>

      <div
        ref={wrapperRef}
        className="relative max-w-[95%] mx-auto group"
        onMouseEnter={() => {
          hoverRef.current = true;
          if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
          if (startTimeoutRef.current) { clearTimeout(startTimeoutRef.current); startTimeoutRef.current = null; }
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
          resetAuto();
        }}
      >
        <div className="relative">
          {slides.map((slide, sIdx) => (
            <div
              key={sIdx}
              className={`grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 transition-opacity duration-700 ${
                sIdx === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
              aria-hidden={sIdx !== current}
            >
              {slide.map((p, i) => {
                const isViewMore = !p.src;
                return (
                  <a
                    key={i}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`project-card project-card-anim ${sIdx === current ? "show" : ""} relative block overflow-hidden rounded-lg cursor-pointer ${
                      isViewMore ? "bg-secondary" : ""
                    }`}
                    style={{ aspectRatio: cardAspect, transitionDelay: sIdx === current ? `${i * 100}ms` : "0ms" }}
                  >
                    {!isViewMore && (
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={p.src}
                          srcSet={p.src800 && p.src1600 ? `${p.src800} 800w, ${p.src} 1200w, ${p.src1600} 1600w` : undefined}
                          sizes="(max-width: 768px) 100vw, 25vw"
                          alt={p.alt}
                          loading="lazy"
                          className="project-img-inner w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                        />
                      </div>
                    )}
                    <div
                      className={`project-card-overlay absolute inset-0 flex items-center justify-center text-center transition-all duration-300 ${
                        isViewMore ? "bg-black/70 opacity-100" : "bg-black/20 opacity-0 hover:opacity-100 hover:bg-black/60"
                      }`}
                    >
                      <p className={`px-3 ${isViewMore ? "text-brand-gold text-xl font-bold" : "text-foreground text-base md:text-lg"}`}>
                        {p.title}
                        {p.artist && (
                          <>
                            <br />
                            <span className="text-sm font-light opacity-80">{p.artist}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        {/* Arrows (desktop only) */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          disabled={current === 0}
          className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-8 lg:-left-10 text-3xl text-foreground opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 hover:text-brand-gold hover:scale-110"
        >
          ❮
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          disabled={current === slides.length - 1}
          className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-10 text-3xl text-foreground opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 hover:text-brand-gold hover:scale-110"
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div
        className={`flex justify-center items-center gap-2 mt-6 md:mt-8 transition-all duration-700 ${
          dotsShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${
              i === current ? "bg-brand-gold" : "bg-white/40 hover:bg-brand-gold/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
