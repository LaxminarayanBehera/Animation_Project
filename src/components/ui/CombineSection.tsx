import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import FaqPage from "../../page/faq/FaqPage";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const CombineSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const footerWrapRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const section = sectionRef.current!;
    const faq = faqRef.current!;
    const footer = footerRef.current!;
    const footerWrap = footerWrapRef.current!;

    if (!section || !faq || !footer || !footerWrap) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${footerWrap.offsetHeight + window.innerHeight}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.to(faq, {
      scale: 0.95,
      opacity: 0.3,
      ease: "none",
      duration: 0.4,
    });

    tl.fromTo(
      footerRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        duration: 1,
      },
      "<",
    );
  });

  return (
    <div ref={sectionRef} className="w-full h-screen relative overflow-hidden">
      <div
        ref={faqRef}
        className="absolute inset-0 z-10 bg-[#0a0a0a] overflow-hidden"
      >
        <FaqPage />
      </div>

      <div
        ref={footerRef}
        className="absolute inset-0 z-20 bg-[#0a0a0a] overflow-y-auto"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <div ref={footerWrapRef}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CombineSection;
