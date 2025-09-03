import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/e-commerce assets/logo/cart0.png";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { count: wishlistCount } = useContext(WishlistContext);
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-16">

          {/* شعار */}
          <div className="flex items-center">
            <Link
              className="text-xl sm:text-2xl font-bold text-violet-900 hover:text-violet-700 transition-colors flex items-center"
              to="/"
            >
              ShopSizzle
              <img src={logo} alt="logo" className="ml-2 h-6 w-6 object-contain" />
            </Link>
          </div>

          {/* روابط Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-violet-700 px-3 py-2">
              {t("navbar.home")}
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-violet-700 px-3 py-2">
              {t("navbar.products")}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-violet-700 px-3 py-2">
              {t("navbar.about")}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-violet-700 px-3 py-2">
              {t("navbar.contact")}
            </Link>
          </div>

          {/* أيقونات + زر اللغة */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* Wishlist */}
            <Link
              to="/favorites"
              className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={t("navbar.wishlist")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart text-gray-700"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" aria-label={t("navbar.cart")}>
              <div className="relative">
                <button className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-cart text-gray-700"
                  >
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-violet-700 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </Link>

            {/* زر اللغة */}
            <button
              onClick={toggleLanguage}
              className="px-2 sm:px-3 py-1 rounded-md bg-violet-700 text-white hover:bg-violet-600 transition-colors text-sm sm:text-base"
            >
              {i18n.language === "en" ? "عربي" : "English"}
            </button>

            {/* زر الموبايل */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x text-gray-700"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu text-gray-700"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 hover:text-violet-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.home")}
              </Link>
              <Link 
                to="/products" 
                className="block px-3 py-2 text-gray-700 hover:text-violet-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.products")}
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-gray-700 hover:text-violet-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.about")}
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-violet-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.contact")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
