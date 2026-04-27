import { useEffect, useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";
// Locally bundled soft Indian raga loop (drone + sitar-like melody).
import ragaLoop from "@/assets/audio/raga-loop.mp3";

const TRACK_URL = ragaLoop;
const FALLBACK_URL = ragaLoop;

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Only render on the client to avoid SSR/hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.3;

    const tryPlay = () => {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    const onFirstGesture = () => {
      a.muted = false;
      tryPlay();
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };

    // Attempt muted autoplay first (allowed by browsers).
    a.muted = true;
    tryPlay();

    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    window.addEventListener("touchstart", onFirstGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };
  }, [mounted]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused || a.muted) {
      a.muted = false;
      a.play().then(() => setPlaying(true)).catch((e) => console.warn("Audio play failed:", e));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const onError = () => {
    const a = audioRef.current;
    if (a && a.src !== FALLBACK_URL) {
      a.src = FALLBACK_URL;
      a.load();
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!mounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK_URL}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={onError}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--gradient-warm)] px-4 py-3 text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:scale-105"
      >
        <span className="relative grid h-5 w-5 place-items-center">
          {playing ? <Pause size={16} /> : <Music2 size={16} />}
          {playing && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
          )}
        </span>
        <span className="text-xs font-medium tracking-wide">
          {playing ? "Playing raga" : "Play raga"}
        </span>
      </button>
    </>
  );
}
