import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
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
    <div
      style={{ position: "relative", display: "inline-block" }}
      className={clsx(fullWidth && "w-full")}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "8px",
          left: 0,
          borderRadius: "9999px",
          background: "#807b76",
          zIndex: 0,
        }}
      />

      <motion.button
        title={title}
        type={type}
        onClick={onClick}
        disabled={disabled}
        initial="rest"
        whileHover={disabled ? "rest" : "hover"}
        whileTap={disabled ? undefined : "active"}
        animate="rest"
        variants={{
          rest: { y: 0 },
          hover: { y: 4 },
          active: { y: 8 },
        }}
        transition={{ duration: 0.15, ease: [0, 0, 0.58, 1] }}
        className={clsx(
          "relative z-10 uppercase font-semibold  rounded-full transition-colors duration-150 flex items-center justify-center gap-2 outline-none border cursor-pointer",
          "bg-[#F58327]",
          sizeStyles[size],
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-white">{children}</div>
      </motion.button>
    </div>
  );
};

export default Button;
