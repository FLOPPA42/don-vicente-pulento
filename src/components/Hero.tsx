import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    video.pause();

    let ticking = false;
    let videoReady = false;

    const updateVideoTime = () => {
      if (!videoReady || !video.duration || isNaN(video.duration)) return;

      // Get scroll position and section bounds
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = section.getBoundingClientRect().top + scrollTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate smooth progress through entire viewport
      const startScroll = sectionTop - viewportHeight;
      const endScroll = sectionBottom;
      const totalScrollRange = endScroll - startScroll;

      let progress = (scrollTop - startScroll) / totalScrollRange;
      progress = Math.max(0, Math.min(1, progress));

      // Set video time with smooth interpolation
      const targetTime = progress * video.duration;
      if (!isNaN(targetTime) && targetTime >= 0 && targetTime <= video.duration) {
        video.currentTime = targetTime;
      }

      ticking = false;
    };

    const handleLoadedData = () => {
      videoReady = true;
      updateVideoTime();
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVideoTime);
        ticking = true;
      }
    };

    // Event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateVideoTime);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateVideoTime);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[250dvh]"
    >
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
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