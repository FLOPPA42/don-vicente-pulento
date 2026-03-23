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

    console.log('Hero: Video element found, setting up scroll handler');

    // Pause video - we control it manually via scroll
    video.pause();
    video.currentTime = 0;

    // Add event listeners for video loading
    const handleLoadedData = () => {
      console.log('Hero: Video loaded successfully, duration:', video.duration);
    };

    const handleError = (e: Event) => {
      console.error('Hero: Video failed to load:', e);
      console.error('Hero: Video error details:', video.error);
    };

    const handleCanPlay = () => {
      console.log('Hero: Video can play, enabling scroll control');
      videoReady = true;
      // Initial call once video is ready
      updateVideoTime();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    let ticking = false;
    let videoReady = false;

    const updateVideoTime = () => {
      if (!videoReady || !video.duration || isNaN(video.duration)) {
        console.log('Hero: Video not ready yet');
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Calculate scroll progress more smoothly
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

      // Smooth the progress value to avoid jerky animation
      const smoothedProgress = Math.max(0, Math.min(1, progress));

      // Set video time with bounds checking
      const targetTime = smoothedProgress * video.duration;
      if (targetTime >= 0 && targetTime <= video.duration) {
        video.currentTime = targetTime;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVideoTime);
        ticking = true;
      }
    };

    // Initial call
    updateVideoTime();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateVideoTime);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateVideoTime);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[250dvh]"
    >
      {/* Fixed video background - only moves with scroll */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onError={(e) => console.error('Video failed to load:', e)}
            onLoadedData={() => console.log('Video loaded successfully')}
          >
            <source src="/video-bg.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      {/* Scrollable content layers */}
      <div className="relative z-10">
        {/* Layer 1 - Hero content */}
        <div className="h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/90">
                Desde Cerrillos, Santiago
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-white drop-shadow-2xl">
              Los Mejores
              <span className="text-secondary block mt-2 drop-shadow-glow">
                Churrascos
              </span>
              <span className="block mt-2">de Chile</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed text-white/90">
              Completo italiano, churrascos, hamburguesas y más.
              <span className="font-semibold text-secondary"> ¡Sabor que enamora!</span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a
                href="#promociones"
                className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground uppercase text-sm tracking-wider transition-all duration-200 hover:shadow-glow-red hover:-translate-y-1 active:scale-[0.97]"
              >
                Ver promociones
              </a>
              <a
                href="#menu"
                className="rounded-full bg-secondary px-8 py-4 font-bold text-secondary-foreground uppercase text-sm tracking-wider transition-all duration-200 hover:shadow-glow-yellow hover:-translate-y-1 active:scale-[0.97]"
              >
                Ver menú completo
              </a>
            </div>
          </div>
        </div>

        {/* Layer 2 - Ingredientes */}
        <div className="h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl space-y-6">
            <span className="text-6xl">🍔</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              Ingredientes
              <span className="text-secondary block">Frescos y de Calidad</span>
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Preparamos todo al momento, con los mejores ingredientes.
              El sabor que nos hace únicos.
            </p>
          </div>
        </div>

        {/* Layer 3 - Call to action */}
        <div className="h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl space-y-8">
            <span className="text-6xl">🔥</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              ¿Tienes Hambre?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90">
              Ven a probar los mejores churrascos de Chile
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#ubicacion"
                className="rounded-full bg-whatsapp px-8 py-4 font-bold text-whatsapp-foreground uppercase text-sm tracking-wider transition-all duration-200 hover:bg-whatsapp-hover hover:shadow-glow-green hover:-translate-y-1 active:scale-[0.97]"
              >
                Ver ubicación
              </a>
              <a
                href="#promociones"
                className="rounded-full bg-secondary px-8 py-4 font-bold text-secondary-foreground uppercase text-sm tracking-wider transition-all duration-200 hover:shadow-glow-yellow hover:-translate-y-1 active:scale-[0.97]"
              >
                Ver promos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#promociones"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float"
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </a>
    </section>
  );
}
