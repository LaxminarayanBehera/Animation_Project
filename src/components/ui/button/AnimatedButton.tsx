import { motion, MotionValue } from "framer-motion";

interface ButtonProps {
  title?: string;
  onclick?: () => void;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const AnimatedButton = ({ title, onclick, x, y }: ButtonProps) => {
  return (
    <motion.div
      onClick={onclick}
      style={{ x, y }}
      className="h-24 w-24 rounded-full bg-[#F58327] flex justify-center hover:cursor-pointer items-center cursor-pointer font-semibold text-sm text-white"
    >
      {title}
    </motion.div>
  );
};

export default AnimatedButton;
