import { motion } from "framer-motion";

const items = [
  "Website Design",
  "Brand Design",
  "Logo Design",
  "User Experience",
  "Senior Designer",
  "10+ Years",
  "Over 100 Customers",
];

const MarqueeTrack = ({
  direction = 1,
  duration = 25,
}: {
  direction?: 1 | -1;
  duration?: number;
}) => {
  const doubled = [...items, ...items];

  return (
    <div className="flex overflow-hidden w-full">
      <motion.div
        className="flex shrink-0 items-center"
        initial={{ x: direction === 1 ? "0%" : "-50%" }}
        animate={{ x: direction === 1 ? "-50%" : "0%" }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 whitespace-nowrap text-white font-bold text-lg pr-6"
            style={{
              fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            }}
          >
            {item}
            <span className="text-white/60 text-sm font-light">✕</span>
          </span>
        ))}
      </motion.div>

      <motion.div
        className="flex shrink-0 items-center"
        initial={{ x: direction === 1 ? "0%" : "-50%" }}
        animate={{ x: direction === 1 ? "-50%" : "0%" }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 whitespace-nowrap text-white font-bold text-lg pr-6"
            style={{
              fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            }}
          >
            {item}
            <span className="text-white/60 text-sm font-light">✕</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const DoubleScroll = () => {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "300px", background: "transparent" }}
    >
      <div
        className="absolute w-[140%] flex items-center bg-[#F58327] overflow-hidden"
        style={{
          height: "64px",
          top: "50px",
          left: "-20%",
          transform: "rotate(-6deg)",
          transformOrigin: "center center",
          zIndex: 2,
        }}
      >
        <MarqueeTrack direction={1} duration={22} />
      </div>

      <div
        className="absolute w-[140%] flex items-center bg-[#0f0f0f] overflow-hidden"
        style={{
          height: "64px",
          top: "130px",
          left: "-20%",
          transform: "rotate(6deg)",
          transformOrigin: "center center",
          zIndex: 1,
        }}
      >
        <MarqueeTrack direction={-1} duration={28} />
      </div>
    </div>
  );
};

export default DoubleScroll;
