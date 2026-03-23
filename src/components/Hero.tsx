import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!section || !video) return;

    const updateTime = () => {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
      video.currentTime = progress * video.duration;
    };

    const onScroll = () => {
      if (!video.paused) video.pause();
      updateTime();
    };

    const onLoaded = () => video.play();
    
    video.addEventListener('canplay', onLoaded);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTime);
        return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTime);
      video.removeEventListener('canplay', onLoaded);
    };
  }, []);

  return (
    <section className="relative min-h-[250dvh]">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          preload="metadata"
        >
          <source src="/video-bg-optimized.mp4" type="video/mp4" />
        </video>
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
            <a href="#menu" className="rounded bg-primary px-6 py-2 text-white">Ver menú</a>
            <a href="#ubicacion" className="rounded bg-secondary px-6 py-2 text-secondary">Ver ubicación</a>
          </div>
        </div>
      </div>

      <a href="#promociones" className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </a>
    </section>
  );
}