"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// استيراد الصور
import gallery1 from "../../assets/e-commerce assets/catagory/gallery1.jpg";
import gallery2 from "../../assets/e-commerce assets/catagory/gallery2.jpg";
import gallery4 from "../../assets/e-commerce assets/catagory/gallery4.jpg";
import gallery5 from "../../assets/e-commerce assets/catagory/gallery5.jpg";
import gallery6 from "../../assets/e-commerce assets/catagory/gallery6.jpg";

export default function CategoriesGallery() {
  const { t } = useTranslation();

  const categories = [
    { label: t("categories.groceries"), src: gallery1 },
    { label: t("categories.perfumes"), src: gallery2 },
    { label: t("categories.homeDecor"), src: gallery4 },
    { label: t("categories.womensBags"), src: gallery5 },
    { label: t("categories.accessories"), src: gallery6 },
  ];

  return (
    <section className="py-20 sm:py-24 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان السكشن */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            {t("categories.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            {t("categories.description")}
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={cat.src}
                alt={cat.label}
                className="w-full h-auto object-cover transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              {/* Overlay عند hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                <span className="text-white text-base sm:text-lg md:text-xl font-semibold">
                  {cat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/products">
            <button className="px-5 sm:px-6 py-3 bg-violet-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:bg-violet-700 transition-all">
              {t("categories.cta")}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
