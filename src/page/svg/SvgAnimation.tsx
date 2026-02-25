import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SvgAnimation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !textPathRef.current) return;

      gsap.fromTo(
        textPathRef.current,
        { attr: { startOffset: "10%" } },
        {
          attr: { startOffset: "100%" },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,
            // markers: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full h-screen bg-black">
      <svg width="100%" height="100%" viewBox="-20 0 557 190">
        <defs>
          <path
            id="curve"
            d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
          />
        </defs>

        {/* <use href="#curve" fill="none" stroke="gray" strokeWidth="2" /> */}
        <text fill="white" fontSize="18" textAnchor="middle">
          <textPath ref={textPathRef} href="#curve" startOffset="0%">
            Welcome to the SVG animation
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default SvgAnimation;
