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
    <div className="overflow-x-hidden">
      {/* الشريطين الجانبيين - مخفيان في الموبايل */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-6 bg-white z-50"></div>
      <div className="hidden lg:block fixed top-0 right-0 h-full w-6 bg-white z-50"></div>

      {/* ===== Hero Section ===== */}
      <HeroHighlight containerClassName="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-blue-700 dark:text-white leading-tight"
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
          className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* الزرار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 sm:mt-6 md:mt-8 flex justify-center"
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
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-violet-500 to-pink-500 hover:from-pink-500 hover:via-purple-600 hover:to-violet-500 transition-all duration-300 shadow-lg"
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
  className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-all duration-300"
  aria-label="Scroll to top"
>
  <svg
    className="w-10 h-10 sm:w-14 sm:h-14"
    viewBox="0 0 64 64"
    fill="none"
  >
    <circle
      cx="32"
      cy="32"
      r={radius}
      stroke="#E5E7EB"
      strokeWidth="4"
      fill="none"
    />
    <circle
      cx="32"
      cy="32"
      r={radius}
      stroke="#8B5CF6"
      strokeWidth="4"
      fill="none"
      strokeDasharray={circumference}
      strokeDashoffset={offset}
      strokeLinecap="round"
    />
  </svg>

  <span className="absolute text-lg sm:text-2xl text-gray-700">&#8679;</span>
</button>

    </div>
  );
}
