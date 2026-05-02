import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "HOME" },
  { id: "studio-projects", label: "STUDIO PROJECTS" },
  { id: "creative-projects", label: "CREATIVE PROJECTS" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) current = s.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const rect = target.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 md:px-8 pt-3 md:pt-4 pb-3">
        <a href="#home" onClick={(e) => handleClick(e, "home")} className="block">
          <img
            src="/images/KENULA KANDANAARACHCHI-03.webp"
            alt="Kenula Kandanaarachchi logo"
            className="h-7 md:h-10 w-auto"
            loading="eager"
          />
        </a>

        <ul
          className={`${
            open ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-[55px] md:top-auto right-0 w-full md:w-auto bg-black/90 md:bg-transparent py-4 md:py-0 text-center md:text-left gap-2 md:gap-6 list-none m-0`}
        >
          {SECTIONS.map((s) => (
            <li key={s.id} className="my-1 md:my-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`uppercase text-sm md:text-[0.95rem] tracking-wide transition-colors hover:text-brand-gold ${
                  active === s.id ? "text-brand-gold font-bold" : "text-foreground"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-3xl text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
