import { useEffect, useRef } from "react";

export function useScrollVideo(videoSrc: string) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    // Set video to pause so we can control it manually
    video.pause();
    video.currentTime = 0;

    const updateVideoTime = () => {
      if (!section || !video) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Calculate scroll progress based on how much section has scrolled
      const scrollTop = window.scrollY || window.pageYOffset;
      const sectionTop = rect.top + scrollTop;
      const sectionBottom = sectionTop + sectionHeight;

      // Progress from 0 to 1 as section moves through viewport
      let progress;
      if (sectionTop > viewportHeight) {
        // Section hasn't entered viewport yet
        progress = 0;
      } else if (sectionBottom < 0) {
        // Section has passed viewport
        progress = 1;
      } else {
        // Section is in viewport - calculate exact progress
        const visibleHeight = Math.min(sectionTop + sectionHeight, viewportHeight) - Math.max(sectionTop, 0);
        const maxScroll = sectionHeight - viewportHeight;
        const currentScroll = Math.max(0, -rect.top);
        progress = maxScroll > 0 ? currentScroll / maxScroll : 1;
      }

      // Smooth interpolation
      const targetTime = progress * (video.duration || 10);
      video.currentTime = targetTime;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateVideoTime();
          ticking = false;
        });
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
    };
  }, []);

  return { sectionRef, videoRef };
}
