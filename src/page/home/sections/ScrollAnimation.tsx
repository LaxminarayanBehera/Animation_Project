import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const section = sectionRef.current!;
    const text = textRef.current!;

    if (!section || !text) return;

    gsap.to(text, {
      x: -text.scrollWidth + section.offsetWidth,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${text.scrollWidth}`,
        scrub: true,
        // markers: true,
        pin: true,
      },
    });
  }, []);

  return (
    <div className="w-full">
      <div className="h-screen w-full flex items-center justify-center p-4 ">
        <h1 className="text-4xl flex items-center justify-center text-center text-white font-semibold italic max-w-sm">
          Animation is a powerful tool that can bring life and excitement to
          your projects.
        </h1>
      </div>
      <div
        ref={sectionRef}
        className="w-full h-screen  bg-[#262626] overflow-hidden flex items-center"
      >
        <h1
          ref={textRef}
          className="text-[300px] font-semibold italic text-white px-10 whitespace-nowrap"
        >
          Hello Welcome to the animation{" "}
        </h1>
      </div>
      <div className="h-screen w-full flex items-center justify-center p-4 ">
        <h1 className="text-4xl flex items-center justify-center text-center text-[#262626] font-semibold italic max-w-sm">
          Subtle movement can communicate ideas more effectively than words
          alone.
        </h1>
      </div>
    </div>
  );
};

export default ScrollAnimation;
