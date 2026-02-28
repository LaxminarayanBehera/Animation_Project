import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const faqData = [
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day refund policy. If you're not satisfied, contact our support team within 30 days of purchase.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes between 5–10 business days depending on your location.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! Our support team is available 24/7 via email.",
  },
  {
    question: "Can I change my order?",
    answer:
      "Orders can be modified within 12 hours of placing them. Please contact support as soon as possible.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping fees may vary based on location.",
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen px-4 md:px-10 py-16 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-4">
        <h1 className="text-xs w-fit rounded-full px-4 py-2 font-semibold bg-[#F58327] text-white text-center">
          Frequently Asked Questions
        </h1>

        <p className="text-3xl md:text-4xl font-semibold text-white text-center">
          Got Questions? We've Got Answers!
        </p>

        <div className="w-full flex flex-col gap-4 mt-6">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              open={activeIndex === index}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;

interface FaqProps {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, open, onClick }: FaqProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      layout
      onClick={onClick}
      className={clsx(
        "w-full rounded-lg p-5 cursor-pointer transition-colors duration-300 border ",
        open ? "border-[#F58327]" : "border-white/30 hover:border-[#F58327]",
      )}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-white text-base font-medium">{question}</h3>

        <motion.span
          className="text-white/60 text-xl"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? "−" : "+"}
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            className="mt-4 text-white/70 text-sm leading-relaxed overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
