"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { Link } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Lazy load components
const TopProducts = lazy(() => import("../components/topproduct/TopProducts"));
const FeaturesSection = lazy(() => import("../components/feautreSection/FeaturesSection"));
const IntroSection = lazy(() => import("../components/introsection/IntroSection"));
const StatsSection = lazy(() => import("../components/stateSection/StatsSection"));
const Catagory = lazy(() => import("../components/catagory/Catagory"));
const Testmonial = lazy(() => import("../components/testemonial/Testmonial"));

// Loading placeholder
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-md"></div>
  </div>
);

export default function Home() {
  const { t } = useTranslation(); // استخدام الترجمة

  // ================= Scroll To Top Setup =================
  const [scrollY, setScrollY] = useState(0);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const offset =
    circumference -
    (scrollY / (document.body.scrollHeight - window.innerHeight)) *
      circumference;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // =======================================================

  return (
    <>
      {/* الشريطين الجانبيين - مخفيان في الموبايل */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-6 bg-white z-50"></div>
      <div className="hidden lg:block fixed top-0 right-0 h-full w-6 bg-white z-50"></div>

      {/* ===== Hero Section ===== */}
      <HeroHighlight containerClassName="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-extrabold text-blue-700 dark:text-white leading-tight"
        >
          👋 {t("welcome")}{" "}
          <Highlight className="text-pink-600 dark:text-yellow-300">
            {t("shopName")}
          </Highlight>
        </motion.h1>

        {/* الوصف */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4"
        >
          {t("description")}
        </motion.p>

        {/* الزرار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex justify-center"
        >
          <Link to="/products">
            <motion.button
              initial={{ y: 0 }}
              whileHover={{
                y: -6,
                boxShadow: "0px 10px 25px rgba(139, 92, 246, 0.5)",
              }}
              whileTap={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-violet-500 to-pink-500 hover:from-pink-500 hover:via-purple-600 hover:to-violet-500 transition-all duration-300 shadow-lg"
            >
              {t("shopNow")}
            </motion.button>
          </Link>
        </motion.div>
      </HeroHighlight>

      {/* باقي الأقسام */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <IntroSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TopProducts />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Catagory />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Testmonial />
      </Suspense>

      {/* زر Scroll To Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
      >
        <svg className="absolute w-16 h-16 -rotate-90" width="64" height="64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="##8B5CF6
"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#8B5CF6
"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="relative text-2xl text-gray-700">&#8679;</span>
      </button>
    </>
  );
}
