import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { UserGroupIcon, CubeIcon, CheckCircleIcon, TrophyIcon, ClockIcon, TruckIcon, PhoneIcon } from "@heroicons/react/24/solid";
import heroImage from "../../assets/e-commerce assets/hero sec/heroImage-2.png";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export default function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    { label: t("stats.happyCustomers"), value: 1200, icon: <UserGroupIcon className="w-10 h-10 text-violet-500 mb-2" /> },
    { label: t("stats.availableProducts"), value: 350, icon: <CubeIcon className="w-10 h-10 text-violet-500 mb-2" /> },
    { label: t("stats.ordersCompleted"), value: 5000, icon: <CheckCircleIcon className="w-10 h-10 text-violet-500 mb-2" /> },
    { label: t("stats.awards"), value: 15, icon: <TrophyIcon className="w-10 h-10 text-violet-500 mb-2" /> },
  ];

  const Counter = ({ value, start }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
      if (start) {
        const controls = animate(count, value, { duration: 2 });
        return () => controls.stop();
      }
    }, [count, value, start]);

    return <motion.span className="text-3xl md:text-5xl font-bold">{rounded}</motion.span>;
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative bg-gray-100 py-8 sm:py-12 lg:py-16 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>

        {/* Section Title */}
        <div className="text-center mt-8 sm:mt-12 relative">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 relative inline-flex items-center gap-2"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {t("stats.title")}
            <motion.span
              className="absolute -top-2 sm:-top-3 right-0"
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: [0, 15, -15, 0], scale: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <SparklesIcon className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
            </motion.span>
          </motion.h2>
        </div>

        {/* Stats + Hero Image */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 relative">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full lg:flex-1 align-center mt-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
                className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg w-full hover:shadow-2xl transition-all"
              >
                <div className="scale-75 sm:scale-100">{stat.icon}</div>
                <Counter value={stat.value} start={isInView} />
                <span className="mt-2 text-sm sm:text-lg md:text-xl text-gray-700 text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative lg:flex-1 flex justify-start lg:ml-8 mt-6 lg:mt-0"
          >
            <img
              src={heroImage}
              alt="Hero"
              className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px] object-contain"
              loading="lazy"
              decoding="async"
            />

            {/* Overlay Info */}
            <div className="absolute -bottom-16 sm:-bottom-20 right-0 bg-white/10 backdrop-blur-2xl rounded-xl shadow-lg px-4 sm:px-6 lg:px-10 py-3 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 z-20 max-w-full">
              <div className="flex flex-col items-center text-center">
                <ClockIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mb-1" />
                <span className="font-semibold text-gray-700 text-xs sm:text-sm">{t("stats.workingHours")}</span>
                <span className="text-gray-600 text-xs">{t("stats.workingHoursTime")}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <TruckIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mb-1" />
                <span className="font-semibold text-gray-700 text-xs sm:text-sm">{t("stats.fastDelivery")}</span>
                <span className="text-gray-600 text-xs">{t("stats.fastDeliveryTime")}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mb-1" />
                <span className="font-semibold text-gray-700 text-xs sm:text-sm">{t("stats.contactUs")}</span>
                <span className="text-gray-600 text-xs">{t("stats.phone")}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
