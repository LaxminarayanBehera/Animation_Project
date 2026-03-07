import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicePage: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "chars" });

    gsap.from(split.chars, {
      x: 150,
      opacity: 0,
      duration: 0.7,
      ease: "power4.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <h1
        ref={textRef}
        className="w-full max-w-xl text-6xl text-white font-bold text-center leading-snug"
      >
        We Create Digital Experiences That Perform
      </h1>
    </div>
  );
};

export default ServicePage;
