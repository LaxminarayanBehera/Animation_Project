import { useEffect, useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

export default function SplitTextDemo() {
  const textRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const setupSplit = () => {
    animationRef.current?.revert();
    splitRef.current?.revert();

    if (!textRef.current) return;

    splitRef.current = new SplitText(textRef.current, {
      type: "chars,words,lines",
    });
  };

  useEffect(() => {
    setupSplit();
    window.addEventListener("resize", setupSplit);

    return () => {
      window.removeEventListener("resize", setupSplit);
      animationRef.current?.revert();
      splitRef.current?.revert();
    };
  }, []);

  const animateChars = () => {
    if (!splitRef.current) return;

    animationRef.current?.revert();

    animationRef.current = gsap.from(splitRef.current.chars, {
      x: 150,
      opacity: 0,
      duration: 0.7,
      ease: "power4.out",
      stagger: 0.04,
    });
  };

  const animateWords = () => {
    if (!splitRef.current) return;

    animationRef.current?.revert();

    animationRef.current = gsap.from(splitRef.current.words, {
      y: -100,
      opacity: 0,
      rotation: "random(-80, 80)",
      duration: 0.7,
      ease: "back.out(1.7)",
      stagger: 0.15,
    });
  };

  const animateLines = () => {
    if (!splitRef.current) return;

    animationRef.current?.revert();

    animationRef.current = gsap.from(splitRef.current.lines, {
      rotationX: -100,
      transformOrigin: "50% 50% -160px",
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.25,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0f1a]">
      <div className="flex w-[90vw] flex-col items-center gap-10">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={animateChars}
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
          >
            Characters
          </button>
          <button
            onClick={animateWords}
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
          >
            Words
          </button>
          <button
            onClick={animateLines}
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
          >
            Lines
          </button>
        </div>

        <div
          ref={textRef}
          className="text-center text-[clamp(2rem,5vw,5rem)] leading-tight text-[#dfdcff] perspective-normal"
        >
          Break apart HTML text into characters, words, and/or lines for easy
          animation.
        </div>
      </div>
    </div>
  );
}
