"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import demoImg from "../../assets/e-commerce assets/hero sec/us.png";
import demoVideo from "../../assets/e-commerce assets/About us/video.mp4";
import { useTranslation } from "react-i18next";

export default function IntroSection() {
  const { t } = useTranslation();

  // جلب بيانات الترجمة
  const intro = t("intro", { returnObjects: true });

  // حركة عامة
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  // حركة قائمة المميزات
  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-6 mt-24 mb-10 md:py-20 bg-violet-50 relative overflow-hidden">
      {/* ===== العنوان ===== */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <motion.h2
          className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          {intro.title}
        </motion.h2>

        <motion.p
          className="text-black mt-4 md:mt-6 text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {intro.description}
        </motion.p>
      </div>

      {/* ===== المحتوى ===== */}
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* الصورة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.img
            src={demoImg}
            alt={intro.title}
            className="rounded-2xl bg-white shadow-2xl object-contain w-full sm:w-4/5 lg:w-full max-h-[500px] md:max-h-[600px] lg:max-h-[700px]"
            loading="lazy"
            decoding="async"
            initial={{ scaleX: -1 }}
            animate={{ y: [0, -20, 0], scaleX: -1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* الفيديو + المميزات */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {/* الفيديو */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-200 hover:scale-105 transition-transform duration-500"
          >
            <video
              src={demoVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-[200px] sm:h-[280px] md:h-[320px] object-cover"
            />
          </motion.div>

          {/* المميزات */}
          <motion.ul
            className="space-y-4 bg-white rounded-xl shadow-md p-4 sm:p-6"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {intro.features.map((text, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3 text-gray-700 text-sm sm:text-base"
              >
                <div className="p-1 rounded-full bg-green-100">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
