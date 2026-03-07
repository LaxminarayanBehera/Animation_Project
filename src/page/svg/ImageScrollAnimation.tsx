import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);

const sections = [
  {
    image:
      "https://cdn.shopify.com/s/files/1/0771/9691/9043/files/molovesoro.jpg?v=1755089905",
    label: "Page 1",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0771/9691/9043/files/pexels-themeditators-23266987.jpg?v=1772254971",
    label: "Page 2",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0771/9691/9043/files/12964.jpg?v=1771855600",
    label: "Page 3",
  },
];

const ImageScrollAnimation = () => {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const outerRefs = useRef<HTMLDivElement[]>([]);
  const innerRefs = useRef<HTMLDivElement[]>([]);
  const bgRefs = useRef<HTMLDivElement[]>([]);
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  const currentIndex = useRef<number>(-1);
  const animating = useRef<boolean>(false);

  useEffect(() => {
    const sectionEls = sectionRefs.current;
    const outerEls = outerRefs.current;
    const innerEls = innerRefs.current;
    const bgEls = bgRefs.current;
    const headingEls = headingRefs.current;

    const wrap = gsap.utils.wrap(0, sections.length);

    gsap.set(outerEls, { yPercent: 100 });
    gsap.set(innerEls, { yPercent: -100 });

    function gotoSection(index: number, direction: number) {
      index = wrap(index);
      animating.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animating.current = false;
        },
      });

      if (currentIndex.current >= 0) {
        gsap.set(sectionEls[currentIndex.current], { zIndex: 0 });
        tl.to(bgEls[currentIndex.current], {
          yPercent: -15 * dFactor,
        }).set(sectionEls[currentIndex.current], { autoAlpha: 0 });
      }

      gsap.set(sectionEls[index], { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerEls[index], innerEls[index]],
        {
          yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor),
        },
        { yPercent: 0 },
        0,
      )
        .fromTo(bgEls[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          headingEls[index],
          {
            autoAlpha: 0,
            yPercent: 150 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
          },
          0.2,
        );

      currentIndex.current = index;
    }

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animating.current && gotoSection(currentIndex.current - 1, -1),
      onUp: () =>
        !animating.current && gotoSection(currentIndex.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);

    return () => {
      observer.kill();
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {sections.map((section, i) => (
          <section
            key={i}
            ref={(el) => {
              if (el) sectionRefs.current[i] = el;
            }}
            className="fixed top-0 left-0 w-full h-full invisible"
            style={{ zIndex: 0 }}
          >
            <div
              ref={(el) => {
                if (el) outerRefs.current[i] = el;
              }}
              className="w-full h-full overflow-hidden"
            >
              <div
                ref={(el) => {
                  if (el) innerRefs.current[i] = el;
                }}
                className="w-full h-full overflow-hidden"
              >
                <div
                  ref={(el) => {
                    if (el) bgRefs.current[i] = el;
                  }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.15) 100%), url(${section.image})`,
                  }}
                >
                  <h2
                    ref={(el) => {
                      if (el) headingRefs.current[i] = el;
                    }}
                    className="relative z-10 text-white font-bold tracking-widest uppercase text-center"
                    style={{
                      fontSize: "clamp(4rem, 4vw, 4rem)",
                      opacity: 0,
                    }}
                  >
                    {section.label}
                  </h2>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default ImageScrollAnimation;
