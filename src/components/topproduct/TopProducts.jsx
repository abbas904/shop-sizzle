"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { ChevronRight } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function getTopProducts() {
      try {
        const cachedData = localStorage.getItem("topProducts");
        const cacheTime = localStorage.getItem("topProductsTime");
        const now = Date.now();

        if (cachedData && cacheTime && now - parseInt(cacheTime) < 5 * 60 * 1000) {
          setProducts(JSON.parse(cachedData));
          return;
        }

        const res = await axios.get("https://dummyjson.com/products?limit=10", { timeout: 10000 });
        setProducts(res.data.products);

        localStorage.setItem("topProducts", JSON.stringify(res.data.products));
        localStorage.setItem("topProductsTime", now.toString());
      } catch (err) {
        console.error(err);
        const cachedData = localStorage.getItem("topProducts");
        if (cachedData) setProducts(JSON.parse(cachedData));
      }
    }
    getTopProducts();
  }, []);

  const translated = t("topProducts", { returnObjects: true });

  return (
    <div className="w-full py-8 sm:py-12 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان + زر View All */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
            {translated?.title || "Top Products"}
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-violet-600 font-bold text-lg sm:text-xl md:text-2xl hover:text-violet-800 transition-colors"
          >
            {translated?.viewAll || "View All"}
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* Swiper */}
        <Swiper
          key={i18n.language} // لإعادة إنشاء Swiper عند تغيير اللغة
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ el: ".custom-pagination", clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          lazy={true}
          preloadImages={false}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={`${product.id}-${i18n.language}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-violet-50 rounded-xl border border-violet-50 shadow-sm p-3 sm:p-4 cursor-pointer flex flex-col justify-between h-full"
              >
                <Link to={`/products/${product.id}`} className="flex flex-col gap-2">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60 object-contain rounded-xl shadow-md bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-violet-600 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-black text-xs sm:text-sm md:text-base line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-black font-bold text-base sm:text-lg">${product.price}</span>
                    <span className="text-yellow-400 font-semibold text-sm sm:text-base">
                      {"★".repeat(Math.round(product.rating))}{" "}
                      <span className="text-black">({product.rating})</span>
                    </span>
                  </div>
                </Link>

                {/* زر Add to Cart */}
                <button
                  onClick={() => {
                    addToCart(product.id);
                    toast.success(translated?.addedToCart || "Product added to cart!");
                  }}
                  className="mt-3 bg-violet-600 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-violet-700 transition-colors text-sm sm:text-base"
                >
                  {translated?.addToCart || "Add to Cart"}
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="custom-pagination mt-6 flex justify-center"></div>
      </div>
    </div>
  );
}
