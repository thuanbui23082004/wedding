import React, { useEffect, useRef } from 'react';

const AutoScroll: React.FC = () => {
  const scrollRequestRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<any>(null);
  const lastScrollY = useRef(0);
  const isAutoScrolling = useRef(false);

  useEffect(() => {
    // Scroll speed: very slow and gentle (pixels per frame)
    const speed = 1.5;

    const startAutoScroll = () => {
      if (isAutoScrolling.current) return;
      isAutoScrolling.current = true;
      lastScrollY.current = window.scrollY;

      const scrollStep = () => {
        if (isScrollingRef.current) {
          isAutoScrolling.current = false;
          return;
        }

        // Scroll by speed pixels
        window.scrollBy(0, speed);

        const currentScrollY = window.scrollY;
        const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 5;

        if (isAtBottom) {
          isAutoScrolling.current = false;
          return;
        }

        lastScrollY.current = currentScrollY;
        scrollRequestRef.current = requestAnimationFrame(scrollStep);
      };

      scrollRequestRef.current = requestAnimationFrame(scrollStep);
    };

    const stopAutoScroll = () => {
      if (scrollRequestRef.current) {
        cancelAnimationFrame(scrollRequestRef.current);
        scrollRequestRef.current = null;
      }
      isAutoScrolling.current = false;
    };

    const resetInactivityTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      isScrollingRef.current = true;
      stopAutoScroll();

      // Resume auto scroll after 3.5 seconds of no interaction
      timeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        startAutoScroll();
      }, 3500);
    };

    const handleScroll = () => {
      if (isAutoScrolling.current) {
        // If difference is larger than auto speed, it is user scroll
        const diff = Math.abs(window.scrollY - lastScrollY.current);
        if (diff > speed + 1) {
          resetInactivityTimer();
        }
      } else {
        resetInactivityTimer();
      }
    };

    const handleTouchStart = () => {
      isScrollingRef.current = true;
      stopAutoScroll();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleTouchEnd = () => {
      resetInactivityTimer();
    };

    // Initial timeout to start auto-scroll 4 seconds after page loads
    timeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 4000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('mousedown', handleTouchStart, { passive: true });
    window.addEventListener('mouseup', handleTouchEnd, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopAutoScroll();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousedown', handleTouchStart);
      window.removeEventListener('mouseup', handleTouchEnd);
    };
  }, []);

  return null;
};

export default AutoScroll;
