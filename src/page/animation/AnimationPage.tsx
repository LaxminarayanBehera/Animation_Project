import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AnimationPage = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firstTextDiv = useRef<HTMLDivElement | null>(null);
  const secondTextDiv = useRef<HTMLDivElement | null>(null);
  const gradientDiv = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const firstDiv = firstTextDiv.current;
    const secondDiv = secondTextDiv.current;
    const gradient = gradientDiv.current;

    if (!wrapper || !section || !firstDiv || !secondDiv || !gradient) return;

    gsap.set(firstDiv, { x: -400, autoAlpha: 0 });
    gsap.set(secondDiv, { x: 400, autoAlpha: 0 });
    gsap.set(gradient, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=2500",
        scrub: 2,
        pin: true,
      },
    });

    tl.to(firstDiv, {
      x: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "none",
    });

    tl.to(
      secondDiv,
      {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "none",
      },
      "-=0.5",
    );

    tl.to({}, { duration: 0.8 });

    tl.to(gradient, {
      autoAlpha: 1,
      duration: 1.5,
      ease: "none",
    });

    tl.to({}, { duration: 0.5 });
  }, []);

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div
        ref={wrapperRef}
        className="relative w-full h-screen overflow-x-hidden"
      >
        <div
          ref={gradientDiv}
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to top, #909E75 10%, #F2EAE2 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 10%)",
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto h-full">
          <div
            ref={sectionRef}
            className="relative w-full h-full flex justify-center items-center z-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0771/9691/9043/files/Problems_Media_Content_Wrapper.png?v=1772186044"
              alt="Surrogate navigating alone"
              className="object-center object-contain max-h-125"
            />
          </div>

          <div
            ref={firstTextDiv}
            className="absolute top-40 left-4 md:top-40 md:left-10 z-20 w-fit flex flex-col justify-center bg-[#CC6448] gap-2 md:gap-4 text-white p-4 md:px-6.5 md:py-7 rounded-[10px]"
          >
            <p className="md:text-base text-sm">Challenges For Surrogates</p>
            <h3 className="md:text-3xl text-lg font-semibold">
              Navigating Alone
            </h3>
          </div>

          <div
            ref={secondTextDiv}
            className="absolute bottom-20 right-4 md:bottom-20 md:right-10 z-20 max-w-xs md:max-w-md bg-[#FBF7F4] text-[#263F20] p-5 md:p-7 rounded-[10px]"
          >
            <p className="text-xs md:text-sm leading-relaxed">
              You apply to multiple agencies, fill out the same forms
              repeatedly, and sit through redundant screenings. One agency, one
              intended parent profile, take-it-or-leave-it compensation. No one
              helps you compare options or negotiate on your behalf.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationPage;
