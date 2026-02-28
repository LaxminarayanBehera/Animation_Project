import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import FaqPage from "../../page/faq/FaqPage";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const CombineSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const boxRef1 = useRef<HTMLDivElement | null>(null);
  const boxRef2 = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const section = sectionRef.current!;
    const box1 = boxRef1.current!;
    const box2 = boxRef2.current!;

    if (!section || !box1 || !box2) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=500%",
        scrub: true,
        pin: true,
        pinSpacing: true,
        // markers: true,
      },
    });

    tl.to(box1, {
      //   scale: 0.94,
      opacity: 0.6,
      ease: "none",
    });

    tl.fromTo(box2, { y: "100%" }, { y: "0%", ease: "none" });
  });

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="relative w-full h-full p-2 flex items-center justify-center overflow-hidden">
        <div ref={boxRef1}>
          <FaqPage />
        </div>

        <div
          ref={boxRef2}
          className="absolute inset-2.5 rounded-3xl bg-linear-to-br from-cyan-500 via-cyan-600 to-cyan-800 z-20 translate-y-full"
        >
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CombineSection;
