import { useEffect, useState } from 'react';

export function useScrollDirection(disabled = false) {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (disabled) return;

    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollingDown((prev) => {
            if (prev !== isScrollingDown) return isScrollingDown;
            return prev;
          });

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, disabled]);

  return scrollingDown;
}
