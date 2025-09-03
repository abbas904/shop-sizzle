"use client";
import { cn } from "../../lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React from "react";
import img1 from "../../assets/e-commerce assets/hero sec/HeroImage-1.png";

export const HeroHighlight = ({ children, className, containerClassName }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      className={cn(
        "relative group flex flex-col md:flex-row items-center justify-between w-full px-6 sm:px-8 lg:px-24 py-16 md:py-24 gap-12",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Dot background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none dark:hidden"
        style={{ backgroundImage: dotPatterns.light.default, backgroundRepeat: "repeat" }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
        style={{ backgroundImage: dotPatterns.dark.default, backgroundRepeat: "repeat" }}
      />

      {/* Content */}
      <div className={cn("flex-1 relative z-10 space-y-6 md:space-y-8 text-center md:text-left", className)}>
        {children}
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center relative z-10">
        <motion.img
          src={img1}
          alt="Hero"
          className="object-contain max-w-[550px] w-full h-auto bg-violet-50 rounded-2xl p-4 hover:border-violet-600 hover:shadow-xl transition-all cursor-pointer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </section>
  );
};

export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      style={{ backgroundRepeat: "no-repeat", backgroundPosition: "left center", display: "inline" }}
      className={cn(
        "relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500",
        className
      )}
    >
      {children}
    </motion.span>
  );
};
