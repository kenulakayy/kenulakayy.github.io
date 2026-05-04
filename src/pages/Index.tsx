import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsSection from "@/components/ProjectsSection";
import Contact from "@/components/Contact";
import { studioSlides, creativeSlides } from "@/data/projects";

const Index = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapperRef.current;
      const img = bgRef.current;
      if (!wrap || !img) return;
      const rect = wrap.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.scrollY - wrap.offsetTop) * 0.12;
        img.style.transform = `translateY(${offset}px) scale(1.2)`;
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />

      <div ref={wrapperRef} className="relative z-0 w-full overflow-hidden">
        <div className="absolute -inset-[20%] z-0 overflow-hidden opacity-25">
          <img
            ref={bgRef}
            src="/images/ST_BG-1920.webp"
            srcSet="/images/ST_BG-1920.webp 1920w, /images/ST_BG-2880.webp 2880w"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-[1.2] will-change-transform blur-[2px] brightness-90"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="relative z-10">
          <ProjectsSection id="studio-projects" title="STUDIO PROJECTS" slides={studioSlides} cardAspect="1 / 1" />
          <ProjectsSection id="creative-projects" title="CREATIVE PROJECTS" slides={creativeSlides} cardAspect="1 / 1.1" />
        </div>
      </div>

      <Contact />
    </main>
  );
};

export default Index;
