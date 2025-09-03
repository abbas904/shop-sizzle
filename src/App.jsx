"use client";
import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/ui/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import { CartContextProvider } from "./context/CartContext";
import { WishlistContextProvider } from "./context/WishlistContext";

// Lazy load components for better performance
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Favorites = lazy(() => import("./pages/Favorites"));
const ProductDetail = lazy(() => import("./components/productDetails/ProductDetail"));
const TopProducts = lazy(() => import("./components/topproduct/TopProducts"));
const FeaturesSection = lazy(() => import("./components/feautreSection/FeaturesSection"));
const IntroSection = lazy(() => import("./components/introsection/IntroSection"));
const StatsSection = lazy(() => import("./components/stateSection/StatsSection"));
const Catagory = lazy(() => import("./components/catagory/Catagory"));
const Testmonial = lazy(() => import("./components/testemonial/Testmonial"));
const Cart = lazy(() => import("./components/cart/Cart"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
  </div>
);

export default function App() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.5, ease: "easeIn" } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* يغلف كل الصفحات بالـ CartContext و WishlistContext */}
      <CartContextProvider>
        <WishlistContextProvider>
        <Navbar />

        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Home />
                  </motion.div>
                }
              />
              <Route
                path="/products"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Products />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/about"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <About />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/contact"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Contact />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProductDetail />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/top-products"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <TopProducts />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/features"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <FeaturesSection />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/intro"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <IntroSection />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/goals"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Catagory />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/cart"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Cart />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/favorites"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Favorites />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/checkout"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <CheckOut />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/testmonial"
                element={
                  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Testmonial />
                    </Suspense>
                  </motion.div>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>

        {/* Toaster لجميع التنبيهات */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: { zIndex: 9999 },
          }}
        />
        </WishlistContextProvider>
      </CartContextProvider>

      {/* إظهار الفوتر في كل الصفحات ماعدا /cart */}
      {location.pathname !== "/cart" && <Footer />}
    </div>
  );
}
