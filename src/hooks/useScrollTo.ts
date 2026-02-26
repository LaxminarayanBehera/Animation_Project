import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

type ScrollTarget = number | string | Element;

export const useScrollTo = () => {
  const scrollToTop = (duration: number = 1): gsap.core.Tween => {
    return gsap.to(window, {
      duration,
      scrollTo: { y: 0, autoKill: true },
      ease: "power2.out"
    });
  };

  const scrollTo = (
    target: ScrollTarget,
    duration: number = 1,
    offset: number = 0
  ): gsap.core.Tween => {
    return gsap.to(window, {
      duration,
      scrollTo: {
        y: target,
        offsetY: offset,
        autoKill: true
      },
      ease: "power2.out"
    });
  };

  return { scrollToTop, scrollTo };
};