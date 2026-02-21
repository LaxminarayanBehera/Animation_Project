// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// const CardAnimation = () => {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const boxRef1 = useRef<HTMLDivElement | null>(null);
//   const boxRef2 = useRef<HTMLDivElement | null>(null);

//   useGSAP(() => {
//     const section = sectionRef.current!;
//     const wrapper = wrapperRef.current!;
//     const box1 = boxRef1.current!;
//     const box2 = boxRef2.current!;

//     if (!section || !wrapper || !box1 || !box2) return;

//     gsap.set(wrapper, { position: "relative", height: "100vh" });
//     gsap.set([box1, box2], {
//       position: "absolute",
//       width: "100%",
//       height: "100%",
//     });
//     gsap.set(box2, { y: "100%", opacity: 1 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: "+=400%",
//         scrub: true,
//         pin: true,
//         markers: true,
//       },
//     });

//     tl.to(box1, {
//       scale: 0.9,
//       z: -40,
//       opacity: 0.6,
//       ease: "none",
//     });

//     tl.to(box2, {
//       y: 0,
//       ease: "none",
//     });

//     tl.to(box2, {
//       scale: 0.9,
//       z: -40,
//       opacity: 0.6,
//       ease: "none",
//     });
//   });

//   return (
//     <>
//       <div
//         ref={sectionRef}
//         className="w-full h-screen flex items-center justify-center"
//       >
//         <div
//           ref={wrapperRef}
//           className="w-full h-full flex items-center justify-center"
//         >
//           <div
//             ref={boxRef1}
//             className="rounded-3xl bg-linear-to-b from-gray-700 via-gray-500 to-gray-600 z-10"
//           ></div>

//           <div
//             ref={boxRef2}
//             className="rounded-3xl bg-linear-to-br from-cyan-500 via-cyan-600 to-cyan-800 z-20"
//           ></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CardAnimation;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CardAnimation = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const boxRef1 = useRef<HTMLDivElement | null>(null);
  const boxRef2 = useRef<HTMLDivElement | null>(null);
  const boxRef3 = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const section = sectionRef.current!;
    const box1 = boxRef1.current!;
    const box2 = boxRef2.current!;
    const box3 = boxRef3.current!;

    if (!section || !box1 || !box2 || !box3) return;

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
      scale: 0.94,
      opacity: 0.6,
      ease: "none",
    });

    tl.fromTo(box2, { y: "100%" }, { y: "0%", ease: "none" });

    tl.to(box2, {
      scale: 0.96,
      opacity: 0.6,
      ease: "none",
    });

    tl.fromTo(box3, { y: "100%" }, { y: "0%", ease: "none" });

    tl.to(box3, {
      scale: 0.98,
      opacity: 0.6,
      ease: "none",
    });
  });

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="relative w-full h-full p-2 flex items-center justify-center overflow-hidden">
        <div
          ref={boxRef1}
          className="absolute inset-2.5 rounded-3xl bg-linear-to-b from-gray-700 via-gray-500 to-gray-600 z-10"
        ></div>

        <div
          ref={boxRef2}
          className="absolute inset-2.5 rounded-3xl bg-linear-to-br from-cyan-500 via-cyan-600 to-cyan-800 z-20 translate-y-full"
        ></div>

        <div
          ref={boxRef3}
          className="absolute inset-2.5 rounded-3xl bg-linear-to-br from-green-400 via-green-500 to-green-600 z-30 translate-y-full"
        ></div>
      </div>
    </div>
  );
};

export default CardAnimation;
