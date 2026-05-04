import { useEffect, useState } from "react";

const Hero = () => {
  const [logoIn, setLogoIn] = useState(false);
  const [textIn, setTextIn] = useState(false);
  const [arrowHidden, setArrowHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoIn(true), 1000);
    const t2 = setTimeout(() => setTextIn(true), 1800);
    const onScroll = () => setArrowHidden(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    setArrowHidden(true);
    const t = document.getElementById("about");
    if (t) window.scrollTo({ top: t.offsetTop, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative z-0 h-screen min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/WEBSITE_HOME_VIDEO_POSTER.webp"
      >
        <source
          src="/videos/WEBSITE_HOME_VIDEO.mp4"
          type="video/mp4"
        />
        <source
          src="/videos/WEBSITE_HOME_VIDEO_1080p.webm"
          type="video/webm"
        />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/20" />
      <div className="relative z-10 text-center px-4">
        <img
          src="/images/BEDROOM ARTWORK-03-02.webp"
          alt="Kenula Kandanaarachchi — Bedroom EP"
          className={`mx-auto max-w-[180px] md:max-w-[250px] h-auto mb-4 transition-all duration-700 ease-out ${
            logoIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        />
        <a
          href="https://open.spotify.com/album/YOUR_EP_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block font-mono-body text-sm md:text-base tracking-widest transition-all duration-700 ease-out border border-white/60 px-6 py-2.5 rounded-full hover:bg-white/15 hover:border-white hover:scale-105 active:scale-95 ${
            textIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          EP OUT NOW
        </a>
      </div>

      <a
        href="#about"
        onClick={scrollToAbout}
        className={`scroll-down ${arrowHidden ? "hide" : ""}`}
        aria-label="Scroll to about"
      >
        <span />
      </a>
    </section>
  );
};

export default Hero;
