import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) {
      console.log('Hero: Section or video ref not found');
      return;
    }

    console.log('Hero: Setting up video scroll handler');

    // Pause video - we control it manually via scroll
    video.pause();
    video.currentTime = 0;

    let ticking = false;
    let videoReady = false;

    const updateVideoTime = () => {
      if (!videoReady || !video.duration || isNaN(video.duration)) {
        console.log('Hero: Video not ready, duration:', video.duration);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Calculate scroll progress using absolute coordinates
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = rect.top + scrollTop;
      const sectionBottom = sectionTop + sectionHeight;
      const viewportBottom = scrollTop + viewportHeight;

      let progress = 0;

      if (viewportBottom > sectionTop && scrollTop < sectionBottom) {
        // Section is in viewport
        const visibleHeight = Math.min(viewportBottom, sectionBottom) - Math.max(scrollTop, sectionTop);
        const scrollableHeight = sectionHeight;
        progress = Math.max(0, Math.min(1, visibleHeight / scrollableHeight));
      } else if (scrollTop >= sectionBottom) {
        progress = 1;
      }

      // Smooth the progress value
      const smoothedProgress = Math.max(0, Math.min(1, progress));

      // Set video time with bounds checking
      const targetTime = smoothedProgress * video.duration;
      if (targetTime >= 0 && targetTime <= video.duration) {
        video.currentTime = targetTime;
        console.log('Hero: Video time:', targetTime.toFixed(2), 'progress:', (smoothedProgress * 100).toFixed(1) + '%');
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVideoTime);
        ticking = true;
      }
    };

    const handleLoadedData = () => {
      console.log('Hero: Video loaded, duration:', video.duration);
      videoReady = true;
      updateVideoTime();
    };

    const handleError = (e: Event) => {
      console.error('Hero: Video failed to load:', e);
    };

    // Initial call
    updateVideoTime();

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateVideoTime);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateVideoTime);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[250dvh]"
    >
      {/* Fixed video background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/video-bg.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
        {/* Overlay gradient */}
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