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
    <div className="container mx-auto">
      <div className="flex ">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex shrink-0"
        >
          {imagesMarque.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-40 h-40 object-center object-contain pr-10"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex shrink-0"
        >
          {imagesMarque.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-40 h-40 object-center object-contain pr-10"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfinityScroll;
