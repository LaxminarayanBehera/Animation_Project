import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const ServicePage2: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const animation = gsap.to(textRef.current, {
      duration: 2,
      scrambleText: {
        text: "We Create Digital Experiences That Perform",
        chars: "XO",
        speed: 0.3,
        revealDelay: 0.5,
      },
      ease: "none",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className="h-screen w-full min-h-fit flex justify-center items-center">
      <h1
        ref={textRef}
        className="w-full max-w-xl text-6xl text-white font-bold text-center leading-snug"
      >
        We Create Digital Experiences That Perform
      </h1>
    </div>
  );
};

export default ServicePage2;
