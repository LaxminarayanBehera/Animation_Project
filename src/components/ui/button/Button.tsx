import React from "react";
import { TiArrowRightThick } from "react-icons/ti";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "md",
  showArrow = true,
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
  title,
}) => {
  const sizeStyles = {
    sm: "px-4 py-3 text-xs",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-xs",
  };

  return (
    <motion.button
      title={title}
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial="rest"
      whileHover={disabled ? "rest" : "hover"}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      animate="rest"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 },
      }}
      className={clsx(
        "uppercase font-semibold rounded-full transition-all bg-[#F58327] duration-300 flex items-center justify-center gap-2 group relative overflow-hidden",
        sizeStyles[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <motion.span
          className="relative z-10"
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: -45 },
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <TiArrowRightThick className="text-base" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default Button;
