import { useEffect, useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";

// Soft Indian-instrumental background loop (CC0 / freely hosted).
const TRACK_URL =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749cbf6.mp3?filename=indian-spiritual-meditation-2-118541.mp3";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(TRACK_URL);
    a.loop = true;
    a.volume = 0.25;
    a.preload = "auto";
    audioRef.current = a;

    // Try a muted autoplay (browsers allow), then unmute on first user gesture.
    a.muted = true;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    const unmute = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
    };
    window.addEventListener("pointerdown", unmute, { once: true });
    window.addEventListener("keydown", unmute, { once: true });

    return () => {
      a.pause();
      audioRef.current = null;
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.muted = false;
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
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
  );
}
