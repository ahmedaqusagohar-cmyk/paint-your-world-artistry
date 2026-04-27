import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#artists", label: "Artists" },
  { href: "#story", label: "Story" },
  { href: "#gallery", label: "Gallery" },
  { href: "#styles", label: "Indian Art" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`glass flex items-center justify-between rounded-full px-5 py-3 transition-all ${
            scrolled ? "shadow-[var(--shadow-warm)]" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-warm)] text-primary-foreground font-display text-lg font-semibold">
              P
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Paint Your World
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/60 text-foreground/80 transition hover:bg-accent hover:text-accent-foreground"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/60 md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 md:hidden animate-in fade-in slide-in-from-top-2">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-foreground/80 hover:bg-accent/30"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
