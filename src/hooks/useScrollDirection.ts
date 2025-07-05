import { useEffect, useState, useRef } from 'react';

export function useScrollDirection(disabled = false) {
  const [scrollingDown, setScrollingDown] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const isScrollingDown = currentScrollY > lastScrollY.current;

          setScrollingDown((prev) => {
            if (prev !== isScrollingDown) return isScrollingDown;
            return prev;
          });

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [disabled]);

  return scrollingDown;
}
