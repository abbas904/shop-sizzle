import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgproduct from "../assets/e-commerce assets/about us/50.jpg";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import toast, { Toaster } from "react-hot-toast";

const PRODUCTS_PER_PAGE = 8;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const fetchAllProducts = async () => {
  const cachedData = localStorage.getItem("allProducts");
  const cacheTime = localStorage.getItem("allProductsTime");
  const now = Date.now();

  if (cachedData && cacheTime && now - parseInt(cacheTime) < 10 * 60 * 1000) {
    return JSON.parse(cachedData);
  }

  const res = await axios.get("https://dummyjson.com/products?limit=100", {
    timeout: 15000,
  });

  localStorage.setItem("allProducts", JSON.stringify(res.data.products));
  localStorage.setItem("allProductsTime", now.toString());

  return res.data.products;
};

function Products() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [category, setCategory] = useState("all");

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const debouncedSearch = useDebounce(searchInput, 500);

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    staleTime: 10 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const uniqueCategories = ["all", ...Array.from(new Set(allProducts.map((p) => p.category)))];

  const processedProducts = allProducts
    .filter((p) => (category === "all" ? true : p.category === category))
    .filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "rating-desc") return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE);
  const productsToDisplay = processedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    addToCart(product.id, 1);
    toast.success(`${product.title} ${t("topProducts.addedToCart")}`, { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-violet-50 flex flex-col relative">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background accents */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-6 bg-white z-50"></div>
      <div className="hidden lg:block fixed top-0 right-0 h-full w-6 bg-white z-50"></div>

      {/* Hero */}
      <div
        className="relative w-full h-[12rem] sm:h-[16rem] md:h-[18rem] shadow-lg flex items-center"
        style={{
          backgroundImage: `url(${imgproduct})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center text-white relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-300">
            {t("topProducts.title")}
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-violet-100">
            {t("topProducts.description")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-4 sm:space-y-6 mt-8 sm:mt-12 pb-16">
        {/* Search */}
        <input
          type="text"
          placeholder={t("topProducts.searchPlaceholder")}
          className="w-full pl-4 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm sm:text-base ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span>{cat === "all" ? "📦" : "🛍️"}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex justify-end">
          <select
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="default">{t("topProducts.sort.default")}</option>
            <option value="price-asc">{t("topProducts.sort.priceAsc")}</option>
            <option value="price-desc">{t("topProducts.sort.priceDesc")}</option>
            <option value="rating-desc">{t("topProducts.sort.ratingDesc")}</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 mb-12">
          {isLoading
            ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded mt-4"></div>
                  </div>
                </div>
              ))
            : productsToDisplay.map((product, index) => {
                const discountedPrice = (
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2);
                return (
                  <motion.div
                    key={product.id}
                    className="rounded-lg shadow-md overflow-hidden flex flex-col bg-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      boxShadow: "0px 20px 30px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Link to={`/products/${product.id}`}>
                      <motion.img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-40 sm:h-48 object-cover cursor-pointer"
                        loading="lazy"
                        decoding="async"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>

                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-base sm:text-lg font-bold text-gray-900">
                          ${discountedPrice}
                        </p>
                        <span className="text-yellow-500 text-sm sm:text-base">
                          {product.rating} ★
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
  {/* Add to Cart */}
  <motion.button
    className="w-full bg-violet-600 text-white px-3 py-2 rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
    whileTap={{ scale: 0.95 }}
    onClick={() => handleAddToCart(product)}
  >
    <i className="fa-solid fa-cart-shopping"></i>
    <span className="truncate">{t("topProducts.addToCart")}</span>
  </motion.button>

  {/* Wishlist */}
  <motion.button
    onClick={() => {
      toggleWishlist(product);
      if (isInWishlist(product.id)) {
        toast.success(`${product.title} ${t("topProducts.wishlistRemoved")}`, { duration: 2000 });
      } else {
        toast.success(`${product.title} ${t("topProducts.wishlistAdded")}`, { duration: 2000 });
      }
    }}
    className={`w-full px-3 py-2 rounded-lg border flex items-center justify-center gap-2 text-sm sm:text-base transition-colors ${
      isInWishlist(product.id)
        ? "border-rose-600 text-rose-600 bg-rose-50 hover:bg-rose-100"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`}
    whileTap={{ scale: 0.95 }}
    aria-label="Toggle wishlist"
  >
    <i className={`fa-solid fa-heart ${isInWishlist(product.id) ? "text-rose-600" : "text-gray-400"}`}></i>
    <span className="truncate">
      {isInWishlist(product.id) ? t("topProducts.wishlisted") : t("topProducts.wishlist")}
    </span>
  </motion.button>
</div>

                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 pb-10 gap-2 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border font-semibold ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              {t("pagination.prev")}
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-lg border font-semibold ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <span key={page} className="px-2 py-2">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border font-semibold ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              {t("pagination.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
