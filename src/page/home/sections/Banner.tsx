import { motion } from "motion/react";
import Button from "../../../components/ui/button/Button";

const Banner = () => {
  return (
    <section className="relative min-h-screen  flex items-center justify-center overflow-hidden px-4">
      <div className="flex flex-col justify-center items-center z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center justify-center gap-x-4 leading-none mb-2"
        >
          <span className="text-white font-semibold text-5xl md:text-7xl tracking-tight">
            The Best
          </span>
          <span
            className="relative text-[#f97316] font-semibold text-5xl md:text-7xl tracking-tight"
            style={{ fontStyle: "italic" }}
          >
            <span
              className="absolute inset-0 border-2 border-[#f97316] rounded-sm -skew-x-2"
              style={{ transform: "skewX(-5deg)" }}
            />
            <span className="relative px-2">Digital</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.15,
          }}
          className="flex flex-wrap items-center justify-center gap-x-4 leading-none mb-8"
        >
          <span className="text-white font-semibold text-5xl md:text-7xl  tracking-tight">
            Marketing
          </span>

          <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-[#f97316] text-3xl md:text-4xl lg:text-5xl shrink-0">
            <img
              src="./marketing.png"
              alt="image"
              className="h-12 md:h-18 w-fit object-center object-contain "
            />
          </span>

          <span className="text-white font-semibold text-5xl md:text-7xl  tracking-tight">
            Agency.
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white/60 text-xs md:text-base max-w-xl mx-auto leading-snug mb-10"
        >
          We believe in combining innovative design, sustainable practices, and
          exceptional craftsmanship to bring your vision to life.
        </motion.p>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          className="flex justify-center"
        >
          <Button className="">Get in Touch</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
