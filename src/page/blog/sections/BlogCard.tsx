import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState } from "react";
import AnimatedButton from "../../../components/ui/button/AnimatedButton";

interface CardProps {
  image?: string;
  title?: string;
  desc?: string;
}

const BlogCard = ({ image, title, desc }: CardProps) => {
  const [isHover, setIsHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 15 });
  const springY = useSpring(y, { stiffness: 350, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.7);
    y.set(offsetY * 0.7);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHover(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="relative w-full h-72 bg-[#F58327] rounded-2xl"
        onMouseEnter={() => setIsHover(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {isHover && (
            <motion.div
              className="absolute inset-0 z-20 flex justify-center items-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              <AnimatedButton title="Read" x={springX} y={springY} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ rotateZ: isHover ? -5 : 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="absolute inset-0 rounded-2xl bg-[#e4ddd9] overflow-hidden"
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute bottom-0 p-3 bg-gray-300 rounded-2xl">
            <h2 className="w-fit bg-[#f97316] px-4 py-1 rounded-full text-black text-base font-semibold mb-2">
              {title}
            </h2>
            <p className="text-black text-xs">{desc}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default BlogCard;
