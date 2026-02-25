import { motion } from "framer-motion";

interface CardProps {
  image?: string;
  title?: string;
  desc?: string;
}

const Card = ({ image, title, desc }: CardProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="relative w-full h-72 bg-[#F58327] rounded-2xl"
        style={{ perspective: 1000 }}
      >
        <motion.div
          whileHover={{
            rotateZ: -5,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
          }}
          className="absolute inset-0 flex flex-col justify-center  rounded-2xl bg-[#e4ddd9] p-4 origin-center"
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="w-16 h-16 mb-3 object-contain object-center rounded-2xl overflow-hidden"
            />
          )}

          <h2 className="text-lg text-black font-semibold mb-2">{title}</h2>

          <p className=" text-black text-xs">{desc}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Card;
