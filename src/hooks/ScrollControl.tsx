// import React, { useRef, useState } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// const ScrollControl: React.FC = () => {
//   const startY = useRef<number | null>(null);
//   const [dragging, setDragging] = useState(false);

//   const scrollUp = () => {
//     window.scrollBy({ top: -200, behavior: "smooth" });
//   };

//   const scrollDown = () => {
//     window.scrollBy({ top: 200, behavior: "smooth" });
//   };

//   const onMouseDown = (e: React.MouseEvent) => {
//     startY.current = e.clientY;
//     setDragging(true);
//   };

//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!dragging || startY.current === null) return;

//     const deltaY = startY.current - e.clientY;
//     window.scrollBy({
//       top: deltaY * 1.5, // 🔥 scroll speed
//       behavior: "auto",
//     });

//     startY.current = e.clientY;
//   };

//   const onMouseUp = () => {
//     startY.current = null;
//     setDragging(false);
//   };

//   return (
//     <div className="fixed top-1/2 left-2 -translate-y-1/2 text-white z-50 select-none">
//       <button onClick={scrollUp} className="mb-2">
//         <IoIosArrowUp size={22} />
//       </button>

//       {/* DRAG AREA */}
//       <div
//         onMouseDown={onMouseDown}
//         onMouseMove={onMouseMove}
//         onMouseUp={onMouseUp}
//         onMouseLeave={onMouseUp}
//         className={`flex flex-col items-center cursor-grab active:cursor-grabbing ${
//           dragging ? "text-orange-400" : "text-gray-500"
//         }`}
//       >
//         <span>—</span>
//         <span>—</span>
//         <span>—</span>
//       </div>

//       <button onClick={scrollDown} className="mt-2">
//         <IoIosArrowDown size={22} />
//       </button>
//     </div>
//   );
// };

// export default ScrollControl;

import clsx from "clsx";
import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ScrollControl: React.FC = () => {
  const controlRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const scrollUp = () => {
    window.scrollBy({ top: -200, behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollBy({ top: 200, behavior: "smooth" });
  };

  const handleDrag = (clientY: number) => {
    if (!controlRef.current) return;

    const rect = controlRef.current.getBoundingClientRect();
    const offsetY = clientY - rect.top;
    const percentage = Math.min(Math.max(offsetY / rect.height, 0), 1);

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: percentage * maxScroll,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    handleDrag(e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    handleDrag(e.clientY);
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="fixed top-1/2 left-1 -translate-y-1/2 text-white z-50 select-none">
      <button onClick={scrollUp} className="mb-2">
        <IoIosArrowUp size={18} />
      </button>

      <div
        ref={controlRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={clsx(
          "flex flex-col items-center cursor-grab active:cursor-grabbing",
          dragging ? "text-orange-400" : "text-gray-500",
        )}
      >
        <span>--</span>
        <span>--</span>
        <span>--</span>
        <span>--</span>
      </div>

      <button onClick={scrollDown} className="mt-2">
        <IoIosArrowDown size={18} />
      </button>
    </div>
  );
};

export default ScrollControl;
