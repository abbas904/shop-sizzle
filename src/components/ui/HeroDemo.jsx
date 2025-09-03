// HeroHighlightDemo.jsx
"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./hero-highlight";

export default function HeroDemo() {
  return (
    <HeroHighlight>
   <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  className="text-2xl md:text-2xl lg:text-2xl font-extrabold text-blue-700 dark:text-white leading-tight text-left w-full"
>
  👋 أهلاً بيك في{" "}
  <Highlight className="text-pink-600 dark:text-yellow-300">
    ShopSizzle
  </Highlight>
</motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-6 text-lg md:text-2xl text-gray-600 dark:text-gray-300 text-center max-w-3xl p-2"
      >
        كل ما تحتاجه في مكان واحد — منتجات أصلية بأسعار مميزة
      </motion.p>

    <motion.button
  initial={{ opacity: 0.5, scale: 0.9 }}
  animate={{ 
    opacity: 0.8, 
    scale: [1, 1.05, 1],   // تكبير وتصغير خفيف (pulse)
    rotate: [0, -2, 2, -2, 0], // اهتزاز خفيف
    boxShadow: [
      "0px 0px 15px rgba(236, 72, 153, 0.6)", // pink
      "0px 0px 20px rgba(139, 92, 246, 0.6)", // violet
      "0px 0px 25px rgba(236, 72, 153, 0.8)", // pink قوي
    ],
  }}
  transition={{ 
    duration: 1.5, 
    repeat: Infinity, 
    repeatType: "mirror", 
    ease: "easeInOut" 
  }}
  className="mt-8 px-8 py-3 rounded-xl text-lg font-medium shadow-lg transition-all bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white h hover:via-violet-500 hover:to-red-500 ml-8"
>
  تسوق الآن
</motion.button>

    </HeroHighlight>
  );
}
