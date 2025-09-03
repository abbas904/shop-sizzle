"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TestimonialsSlider() {
  const { t } = useTranslation();
  const quotes = t("testimonials.quotes", { returnObjects: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {t("testimonials.title")}
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          {t("testimonials.description")}
        </p>
      </div>

      <div className="mt-8 sm:mt-12 max-w-2xl mx-auto relative px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={`https://i.pravatar.cc/150?u=${current}`} 
                alt={quotes[current].name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {quotes[current].name}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {quotes[current].designation}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-700 italic text-center sm:text-left">
              "{quotes[current].quote}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
