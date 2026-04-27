import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Palette, MapPin, Send, Sparkles } from "lucide-react";

import { Navbar } from "@/components/site/Navbar";
import { AudioPlayer } from "@/components/site/AudioPlayer";
import { useReveal } from "@/hooks/use-reveal";

import heroArt from "@/assets/hero-art.jpg";
import madhubani from "@/assets/madhubani.jpg";
import warli from "@/assets/warli.jpg";
import pattachitra from "@/assets/pattachitra.jpg";
import tanjore from "@/assets/tanjore.jpg";
import kalamkari from "@/assets/kalamkari.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const styles = [
  { name: "Madhubani", region: "Bihar", img: madhubani, desc: "Vivid, geometric folk art born on the mud walls of Mithila — fish, lotuses and gods rendered in natural pigments." },
  { name: "Warli", region: "Maharashtra", img: warli, desc: "Ritual tribal painting of stick figures dancing around the tarpa — a meditation on harmony between people and nature." },
  { name: "Pattachitra", region: "Odisha", img: pattachitra, desc: "Cloth scrolls of devotion painted with mineral colours — every Jagannath, every leaf, drawn by hand for centuries." },
  { name: "Tanjore", region: "Tamil Nadu", img: tanjore, desc: "Gold-leaf splendour and gem inlay glorifying deities — the regal opulence of South Indian temple painting." },
  { name: "Kalamkari", region: "Andhra Pradesh", img: kalamkari, desc: "‘Pen craft’ on cotton — peacocks and trees of life drawn with a bamboo kalam and natural indigo dyes." },
];

const artists = [
  { name: "Sunita Devi", craft: "Madhubani Master", img: artist1, bio: "Three generations of Mithila lines flow through her brush — fish, gods, and the pulse of her village." },
  { name: "Raghav Mhase", craft: "Warli Storyteller", img: artist2, bio: "Paints with rice paste and bamboo, turning the rhythms of harvest into circles of dancing figures." },
  { name: "Lakshmi Maharana", craft: "Pattachitra Elder", img: artist3, bio: "Keeper of palm-leaf scrolls — at 72 she still grinds her own pigments before sunrise each day." },
];

const galleryItems = [
  { img: g1, title: "Zanrani", artist: "Mixed media" },
  { img: g2, title: "Garden of the Mughals", artist: "Miniature" },
  { img: g3, title: "Deer Under Dot Tree", artist: "Gond" },
  { img: g4, title: "Riders of Marwar", artist: "Phad" },
  { img: madhubani, title: "Lotus & Koi", artist: "Madhubani" },
  { img: kalamkari, title: "Tree of Life", artist: "Kalamkari" },
];

const filters = ["All", "Madhubani", "Warli", "Gond", "Phad", "Miniature", "Kalamkari", "Mixed media"];

function Index() {
  useReveal();

  // Parallax for hero art
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? galleryItems : galleryItems.filter((g) => g.artist === filter);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <AudioPlayer />

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src={heroArt}
            alt="Painted canvas blending Indian art motifs"
            width={1920}
            height={1280}
            className="h-full w-full animate-ken-burns object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-foreground/70 backdrop-blur reveal">
            <Sparkles size={14} className="text-accent" /> A Living Gallery
          </span>
          <h1 className="reveal mt-6 font-display text-6xl font-medium leading-[1.05] sm:text-7xl md:text-[7.5rem]">
            Paint Your <span className="text-gradient-warm italic">World</span>
          </h1>
          <p className="reveal mx-auto mt-6 max-w-2xl font-script text-3xl text-foreground/85 md:text-4xl">
            Where every artist belongs.
          </p>
          <p className="reveal mx-auto mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
            An immersive home for Indian art — its hands, its stories, its colours that
            never fade.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#gallery"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--gradient-warm)] px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:scale-[1.03]"
            >
              Enter the Gallery
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-accent/30"
            >
              Read the Story
            </a>
          </div>

          {/* floating brush flecks */}
          <div className="pointer-events-none absolute -left-10 top-32 h-32 w-32 rounded-full bg-accent/30 blur-3xl animate-float" />
          <div className="pointer-events-none absolute -right-12 bottom-24 h-40 w-40 rounded-full bg-primary/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="brush-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ARTISTS */}
      <section id="artists" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="reveal text-sm uppercase tracking-[0.3em] text-primary">Featured</p>
            <h2 className="reveal mt-3 font-display text-5xl md:text-6xl">
              The hands behind the colour
            </h2>
            <p className="reveal mt-4 text-foreground/70">
              Three artists. Three traditions. One belief — that every story deserves a canvas.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {artists.map((a, i) => (
              <article
                key={a.name}
                className="reveal group hover-lift glass overflow-hidden rounded-3xl"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.name}
                    width={768}
                    height={896}
                    loading="lazy"
                    className="zoom-img h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-script text-2xl text-accent">{a.craft}</p>
                    <h3 className="font-display text-3xl">{a.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-foreground/75">{a.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="relative py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
          <div className="reveal relative">
            <div className="absolute -inset-6 rounded-3xl bg-[var(--gradient-warm)] opacity-20 blur-2xl" />
            <img
              src={warli}
              alt="Warli painting"
              width={800}
              height={1024}
              loading="lazy"
              className="relative rounded-3xl border border-accent/30 shadow-[var(--shadow-gold)]"
            />
          </div>
          <div>
            <p className="reveal text-sm uppercase tracking-[0.3em] text-primary">The Storyline</p>
            <h2 className="reveal mt-3 font-display text-5xl leading-tight md:text-6xl">
              The artist <span className="italic text-gradient-warm">belongs</span> to everyone.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
              <p className="reveal">
                Long before galleries existed, there were walls of mud, floors of cow-dung, and
                grandmothers grinding turmeric into gold. Art in India was never made for collectors —
                it was made for festivals, for gods, for the joy of the morning.
              </p>
              <p className="reveal">
                Today the walls have changed, but the impulse hasn't. Across villages and cities,
                hands still reach for pigment because something inside <em>must</em> be drawn.
              </p>
              <p className="reveal font-script text-3xl text-primary">
                Creativity is not a profession — it is a place where the soul comes home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="reveal text-sm uppercase tracking-[0.3em] text-primary">Gallery</p>
              <h2 className="reveal mt-3 font-display text-5xl md:text-6xl">
                A wall of wonders
              </h2>
            </div>
            <div className="reveal flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition ${
                    filter === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card/50 text-foreground/70 hover:border-primary/50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {filtered.map((item, i) => (
              <figure
                key={item.title + i}
                className={`reveal group relative overflow-hidden rounded-2xl border border-border ${
                  i % 5 === 0 ? "md:row-span-2 md:col-span-2" : ""
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="zoom-img aspect-square h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-xl">{item.title}</p>
                  <p className="text-xs uppercase tracking-widest text-accent">{item.artist}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INDIAN ART STYLES */}
      <section id="styles" className="relative py-32 canvas-texture">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="reveal text-sm uppercase tracking-[0.3em] text-primary">Heritage</p>
            <h2 className="reveal mt-3 font-display text-5xl md:text-6xl">
              Five voices from the soil
            </h2>
            <p className="reveal mt-4 text-foreground/70">
              Each tradition is a language — spoken in pigment, passed down by hand.
            </p>
          </div>

          <div className="mt-16 space-y-10">
            {styles.map((s, i) => (
              <article
                key={s.name}
                className={`reveal grid items-center gap-8 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="group relative overflow-hidden rounded-3xl border border-accent/30 shadow-[var(--shadow-gold)]">
                  <img
                    src={s.img}
                    alt={`${s.name} art`}
                    width={800}
                    height={1024}
                    loading="lazy"
                    className="zoom-img aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div>
                  <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-primary">
                    <Palette size={14} /> 0{i + 1}
                  </p>
                  <h3 className="mt-3 font-display text-5xl">{s.name}</h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground/70">
                    <MapPin size={14} className="text-accent" /> {s.region}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-foreground/80">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass reveal rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Say Hello</p>
              <h2 className="mt-3 font-display text-5xl">Send a message</h2>
              <p className="mt-3 text-foreground/70">
                Featured artists, partnerships, or just a kind word — we read every line.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                form.reset();
                alert("Thank you! Your message has been sent.");
              }}
              className="mt-10 grid gap-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Your message…"
                className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gradient-warm)] px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:scale-[1.02]"
              >
                Send message
                <Send size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-foreground/60 md:flex-row">
          <p className="font-display text-base">
            Paint Your World <span className="text-foreground/40">·</span>{" "}
            <span className="font-script text-lg text-primary">Where every artist belongs</span>
          </p>
          <p>© {new Date().getFullYear()} Crafted with colour & care.</p>
        </div>
      </footer>
    </div>
  );
}
