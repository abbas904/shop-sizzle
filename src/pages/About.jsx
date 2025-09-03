"use client";
import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import bgImage from "../assets/e-commerce assets/contact us/laptop.jpg";
import demoImg from "../assets/e-commerce assets/About us/we1.jpg";
import demoVideo from "../assets/e-commerce assets/About us/video2.mp4";
import { motion } from "framer-motion";
import { CheckCircle, Heart, User, Star, Zap, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import mem1 from "../assets/e-commerce assets/About us/our team/team-1.jpg";
import mem2 from "../assets/e-commerce assets/About us/our team/team-2.jpg";
import mem3 from "../assets/e-commerce assets/About us/our team/team-3.jpg";
import mem4 from "../assets/e-commerce assets/About us/our team/team-4.jpg";

export default function About() {
  const { t, i18n } = useTranslation();
  const swiperRef = useRef(null);

  useEffect(() => {
    // تحديث السلايدر عند تغيير اللغة
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [i18n.language]);

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } } };
  const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.25 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  const brands = [
    { src: "https://cdn.worldvectorlogo.com/logos/apple-11.svg", alt: "Apple" },
    { src: "https://cdn.worldvectorlogo.com/logos/lenovo-1.svg", alt: "Lenovo" },
    { src: "https://cdn.worldvectorlogo.com/logos/hp-1.svg", alt: "HP" },
    { src: "https://cdn.worldvectorlogo.com/logos/lg-1.svg", alt: "LG" },
    { src: "https://cdn.worldvectorlogo.com/logos/intel-1.svg", alt: "Intel" },
    { src: "https://cdn.worldvectorlogo.com/logos/samsung-2.svg", alt: "Samsung" },
  ];

  const team = [
    { name: "Sarah Chen", role: "Product Manager", img: mem1 },
    { name: "Emily Watson", role: "CTO", img: mem2 },
    { name: "Michelle Lee", role: "Operations Director", img: mem3 },
    { name: "James Kim", role: "Engineering Lead", img: mem4 },
  ];

  return (
    <main className="overflow-hidden">
      {/* ===== Banner ===== */}
      <motion.section className="relative w-full h-[12rem] sm:h-[16rem] md:h-[18rem] shadow-lg flex items-center mb-10" initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
        <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-400" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            {t("about.banner.title")}
          </motion.h2>
          <motion.p className="mt-4 text-sm sm:text-base md:text-lg font-bold text-gray-250 max-w-2xl px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            {t("about.banner.subtitle")}
          </motion.p>
        </div>
      </motion.section>

      {/* ===== Our Values ===== */}
      <motion.section className="py-8 sm:py-12 lg:py-16 mt-20" initial="hidden" whileInView="visible" variants={listVariants} viewport={{ once: true }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16 px-4" variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-wide">{t("about.values.title")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">{t("about.values.description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[{ titleKey: "about.values.customerFirst", descKey: "about.values.customerFirstDesc", color: "blue", icon: <User className="w-7 h-7" /> },
              { titleKey: "about.values.excellence", descKey: "about.values.excellenceDesc", color: "green", icon: <Star className="w-7 h-7" /> },
              { titleKey: "about.values.innovation", descKey: "about.values.innovationDesc", color: "yellow", icon: <Zap className="w-7 h-7" /> },
              { titleKey: "about.values.integrity", descKey: "about.values.integrityDesc", color: "purple", icon: <ShieldCheck className="w-7 h-7" /> }
            ].map((value, index) => (
              <motion.div key={index} className="bg-white p-4 sm:p-6 rounded-md shadow-md text-center hover:shadow-lg transition duration-300 ease-in-out" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}>
                <div className={`p-3 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-4 mx-auto ${value.color === "blue" ? "bg-blue-100" : value.color === "green" ? "bg-green-100" : value.color === "yellow" ? "bg-yellow-100" : "bg-purple-100"}`}>
                  <div className="scale-75 sm:scale-100">{value.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{t(value.titleKey)}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{t(value.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== Website Advantages ===== */}
      <motion.section className="py-6 mt-24 mb-10 md:py-20 bg-violet-50 relative overflow-hidden" initial="hidden" whileInView="visible" variants={listVariants} viewport={{ once: true }}>
        <div className="text-center mb-12 md:mb-16 px-4">
          <motion.h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent" variants={itemVariants}>{t("about.advantages.title")}</motion.h2>
          <motion.p className="text-black mt-4 md:mt-6 text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed" variants={itemVariants}>
            {t("about.advantages.description")}
            <motion.span className="inline-block ml-1" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: [0.9, 1.2, 1], opacity: 1 }} transition={{ duration: 1.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}>
              <Heart className="w-5 h-5 text-pink-500" />
            </motion.span>
          </motion.p>
        </div>

        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="flex justify-center">
            <motion.img src={demoImg} alt="Website Preview" className="rounded-2xl bg-white shadow-2xl object-contain w-full sm:w-4/5 lg:w-full max-h-[700px]" initial={{ scaleX: -1 }} animate={{ y: [0, -20, 0], scaleX: -1 }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>

          <motion.div className="flex flex-col gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-200 hover:scale-105 transition-transform duration-500">
              <video src={demoVideo} autoPlay loop muted playsInline className="w-full h-[200px] sm:h-[280px] md:h-[320px] object-cover" />
            </motion.div>

            <motion.ul className="space-y-4 bg-white rounded-xl shadow-md p-4 sm:p-6" variants={listVariants}>
              {["adv1", "adv2", "adv3", "adv4"].map((key, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                  <div className="p-1 rounded-full bg-green-100">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <span>{t(`about.advantages.${key}`)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== Brands ===== */}
      <motion.section className="py-16 mt-20" initial="hidden" whileInView="visible" variants={listVariants} viewport={{ once: true }}>
        <div className="container mx-auto px-6 py-6 text-center">
          <motion.div className="text-center mb-8">
            <motion.h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent relative inline-block" initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
              {t("about.brands.title")}
            </motion.h2>
            <motion.p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">{t("about.brands.subtitle")}</motion.p>
          </motion.div>

          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={4}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <motion.div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-lg border-2 border-violet-50 hover:shadow-xl transition-all duration-300" initial={{ opacity: 0.8, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.2 }} viewport={{ once: true }}>
                  <img src={brand.src} alt={brand.alt} className="w-full h-40 object-contain" />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* ===== Our Team ===== */}
      <motion.section className="py-16 mt-20 mb-20" initial="hidden" whileInView="visible" variants={listVariants} viewport={{ once: true }}>
        <motion.div className="text-center mb-16 px-4" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-wide">{t("about.team.title")}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">{t("about.team.subtitle")}</p>
        </motion.div>

        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300" variants={itemVariants}>
              <div className="relative">
                <img src={member.img} alt={member.name} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
