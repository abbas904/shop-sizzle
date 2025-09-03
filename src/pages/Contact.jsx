"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import bgImage from "../assets/e-commerce assets/contact us/carousel-1.jpg";

export default function Contact() {
  const { t } = useTranslation();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const faqs = [
    {
      question: t("contact.faqs.trackOrder.question"),
      answer: t("contact.faqs.trackOrder.answer"),
    },
    {
      question: t("contact.faqs.returnPolicy.question"),
      answer: t("contact.faqs.returnPolicy.answer"),
    },
    {
      question: t("contact.faqs.internationalShipping.question"),
      answer: t("contact.faqs.internationalShipping.answer"),
    },
    {
      question: t("contact.faqs.cancelOrder.question"),
      answer: t("contact.faqs.cancelOrder.answer"),
    },
  ];

  return (
    <>
      {/* ===== Banner ===== */}
      <motion.section
        className="relative w-full min-h-[16rem] sm:min-h-[20rem] md:min-h-[22rem] flex items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg text-violet-400"
            variants={itemVariants}
          >
            {t("contact.banner.title")}
          </motion.h2>
          <motion.p
            className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-3xl drop-shadow-md leading-relaxed px-4"
            variants={itemVariants}
          >
            {t("contact.banner.subtitle")}
          </motion.p>

          <motion.a
            href={`mailto:${t("contact.email")}`}
            className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-xl transition-all duration-300 text-sm sm:text-base"
            variants={itemVariants}
          >
            {t("contact.banner.cta")}
          </motion.a>
        </div>
      </motion.section>

      {/* ===== Contact Form Section ===== */}
      <motion.section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row gap-8 sm:gap-12"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
      >
        {/* Form */}
        <motion.div className="flex-1 bg-white rounded-2xl shadow-xl p-6 sm:p-8" variants={itemVariants}>
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">{t("contact.form.title")}</h3>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t("contact.form.name")}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder={t("contact.form.email")}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base"
            />
            <textarea
              placeholder={t("contact.form.message")}
              rows={5}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none text-sm sm:text-base"
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-2 sm:py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              {t("contact.form.submit")}
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="flex-1 flex flex-col gap-4 sm:gap-6 justify-center" variants={itemVariants}>
          <div className="bg-violet-50 p-4 sm:p-6 rounded-xl shadow-md flex items-start gap-3 sm:gap-4">
            <Mail className="text-violet-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-1">{t("contact.info.email.title")}</h4>
              <p className="text-gray-700 text-sm sm:text-base">{t("contact.info.email.value")}</p>
            </div>
          </div>
          <div className="bg-violet-50 p-4 sm:p-6 rounded-xl shadow-md flex items-start gap-3 sm:gap-4">
            <Phone className="text-violet-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-1">{t("contact.info.phone.title")}</h4>
              <p className="text-gray-700 text-sm sm:text-base">{t("contact.info.phone.value")}</p>
            </div>
          </div>
          <div className="bg-violet-50 p-4 sm:p-6 rounded-xl shadow-md flex items-start gap-3 sm:gap-4">
            <MapPin className="text-violet-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-1">{t("contact.info.location.title")}</h4>
              <p className="text-gray-700 text-sm sm:text-base">{t("contact.info.location.value")}</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ===== Google Map ===== */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 text-gray-900">
              {t("contact.map.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              {t("contact.map.subtitle")}
            </p>
          </div>

          <div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="ShopSizzle Location"
              src={t("contact.map.embedUrl")}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 mt-10"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("contact.faqs.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
              {t("contact.faqs.subtitle")}
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                variants={itemVariants}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md cursor-pointer group"
              >
                <summary className="flex items-center justify-between text-base sm:text-lg font-semibold text-gray-800 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="text-violet-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{faq.question}</span>
                  </span>
                  <span className="group-open:rotate-180 transition-transform text-sm sm:text-base">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm sm:text-base">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
