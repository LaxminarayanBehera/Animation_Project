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
  video?: string;
  title?: string;
  desc?: string;
}

const BlogCard = ({ image, video, title, desc }: CardProps) => {
  const [isHover, setIsHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 15 });
  const springY = useSpring(y, { stiffness: 350, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.7);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.7);
  };

  return (
    <div className="relative w-full">
      <div
        className="relative w-full h-72 bg-[#F58327] rounded-2xl"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseMove={handleMouseMove}
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
          {video ? (
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No media
            </div>
          )}

          <div className="w-full absolute bottom-0 p-3 bg-gray-300 rounded-2xl">
            <h2 className="w-fit bg-[#f97316] px-4 py-1 rounded-full text-black text-sm font-semibold mb-2">
              {title}
            </h2>
            <p className="text-black text-xs line-clamp-3">{desc}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogCard;
