import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Video plays automatically in loop
    video.play().catch(() => {
      // Autoplay may be blocked, that's okay
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section className="relative min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10">
        <div className="h-screen flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Los Mejores Churrascos
          </h1>
          <p className="text-lg text-white/90 max-w-xl">
            Sabor auténtico de Chile
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#menu" className="rounded bg-primary px-6 py-2 text-white font-semibold hover:shadow-lg transition">Ver menú</a>
            <a href="#ubicacion" className="rounded bg-secondary px-6 py-2 text-white font-semibold hover:shadow-lg transition">Ver ubicación</a>
          </div>
        </div>
      </div>

      <a href="#promociones" className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </a>
    </section>
  );
}