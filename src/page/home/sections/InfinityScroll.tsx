import { motion } from "framer-motion";

const InfinityScroll = () => {
  const imagesMarque = [
    "./01.svg",
    "./02.svg",
    "./03.svg",
    "./04.svg",
    "./05.svg",
    "./06.svg",
    "./07.svg",
    "./08.svg",
    "./09.svg",
    "./10.svg",
    "./11.svg",
    "./12.svg",
    "./13.svg",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-[#050000] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-[#0a0a0a] to-transparent z-10" />

      <div className="flex h-20 items-center">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="flex shrink-0"
        >
          {imagesMarque.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-[20%] h-14 object-contain pr-10"
              alt="brand"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="flex shrink-0"
        >
          {imagesMarque.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-[20%] h-14 object-contain pr-10"
              alt="brand"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfinityScroll;
