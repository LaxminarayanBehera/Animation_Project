import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  const text =
    "A delicate balance of stillness and movement, presence and absence. It captures bodies in transformation.";

  const words = text.split(" ");

  useGSAP(() => {
    const wordsEl = gsap.utils.toArray(".word");

    gsap.fromTo(
      wordsEl,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          //   markers: true,
        },
      },
    );
  });

  return (
    <div ref={sectionRef} className="w-full h-screen">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
        <div className="w-full flex justify-center items-center p-10">
          <h1
            ref={textRef}
            className="text-white font-semibold text-5xl leading-tight"
          >
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-2">
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div className="w-full h-full flex justify-center items-center">
          <img
            src="https://cdn.shopify.com/s/files/1/0771/9691/9043/files/pexels-themeditators-23266987.jpg?v=1772254971"
            alt="image"
            className="w-full h-full object-center object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default TextAnimation;
