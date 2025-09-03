"use client";
import React from "react";
import { Coffee, ShoppingCart, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // <--- استدعاء الترجمة

export default function Features() {
  const { t } = useTranslation();

  const featuresData = [
    {
      icon: <Coffee className="w-8 h-8 text-yellow-500" />,
      title: t("features.premiumCoffee"),
      description: t("features.premiumCoffeeDesc"),
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-500" />,
      title: t("features.easyShopping"),
      description: t("features.easyShoppingDesc"),
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: t("features.fastDelivery"),
      description: t("features.fastDeliveryDesc"),
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: t("features.securePayment"),
      description: t("features.securePaymentDesc"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
        >
          {t("features.title")}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-center"
            >
              <div className="flex justify-center mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
