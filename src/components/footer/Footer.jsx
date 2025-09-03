// src/components/ui/Footer.jsx
import React from "react";
import logo from "../../assets/e-commerce assets/logo/cart0.png"; 
import bgImage from "../../assets/e-commerce assets/footer/footer-four.png"; // الخلفية

export default function Footer() {
  return (
    <footer
      className="relative text-gray-100 pt-16 pb-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay خفيف عشان النص يبين */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          {/* About */}
          <div className="footer-item">
            <div className="f-item about">
              <img src={logo} alt="Logo" className="mb-4 w-20 sm:w-24" />
              <p className="mb-4 text-gray-100 text-sm sm:text-base">
                Discover culinary delights, recipes, and inspiration in our food haven.
              </p>
              <ul className="text-xs sm:text-sm space-y-1 text-gray-200">
                <li>Mon - Fri <span className="float-right">8:00 AM - 6:00 PM</span></li>
                <li>Saturday <span className="float-right">9:00 AM - 5:00 PM</span></li>
              </ul>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-item">
            <div className="f-item link no-underline">
              <h4 className="text-base sm:text-lg font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-200">
                <li><a href="/about-us" className="hover:text-violet-400 transition-colors text-sm sm:text-base">Company Profile</a></li>
                <li><a href="/about-us" className="hover:text-violet-400 transition-colors text-sm sm:text-base">About</a></li>
                <li><a href="/contact" className="hover:text-violet-400 transition-colors text-sm sm:text-base">Help Center</a></li>
                <li><a href="/contact" className="hover:text-violet-400 transition-colors text-sm sm:text-base">Career</a></li>
                <li><a href="/about-us" className="hover:text-violet-400 transition-colors text-sm sm:text-base">Features</a></li>
                <li><a href="/contact" className="hover:text-violet-400 transition-colors text-sm sm:text-base">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-item">
            <div className="f-item contact">
              <h4 className="text-base sm:text-lg font-bold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-gray-200 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-violet-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" />
                  </svg>
                  <span>175 10h Street, Office 375 Berlin, De 21562</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-violet-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79C8.06 13.99 10.9 16.82 14.11 18.26L16.41 15.96C16.61 15.76 16.91 15.7 17.16 15.79C18.27 16.17 19.45 16.36 20.66 16.36C21.4 16.36 22 16.96 22 17.7V21.66C22 22.4 21.4 23 20.66 23C10.28 23 1 13.72 1 3.34C1 2.6 1.6 2 2.34 2H6.3C7.04 2 7.64 2.6 7.64 3.34C7.64 4.55 7.83 5.73 8.21 6.84C8.3 7.09 8.24 7.39 8.04 7.59L5.74 9.89Z" />
                  </svg>
                  <span>
                    <a href="tel:2151234567">+123 34598768</a><br />
                    <a href="tel:2151234567">+554 34598734</a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-violet-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
                  </svg>
                  <span><a href="mailto:food@restan.com">food@restan.com</a></span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-item">
            <div className="f-item newsletter">
              <h4 className="text-base sm:text-lg font-bold mb-4">Newsletter</h4>
              <p className="mb-4 text-xs sm:text-sm text-gray-100">
                Join our subscribers list to get the latest news and special offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="px-3 sm:px-4 py-2 rounded-md flex-1 text-gray-900 text-sm sm:text-base"
                />
                <button type="submit" className="px-3 sm:px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 transition-colors text-sm sm:text-base">
                  Subscribe
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>

              {/* Social Media */}
             {/* Social Media */}
<div className="footer-social mt-4 sm:mt-6">
  <h4 className="font-bold mb-2 text-sm sm:text-base">Social Media:</h4>
  <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl">
    {/* Facebook */}
    <a href="https://www.facebook.com" target="_blank" className="hover:text-blue-500 transition-transform transform hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.324v21.352C0 23.406.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.794.142v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.324V1.324C24 .592 23.405 0 22.675 0z"/>
      </svg>
    </a>

    {/* Dribbble */}
    <a href="https://dribbble.com" target="_blank" className="hover:text-pink-400 transition-transform transform hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm6.45 5.1c2.448 2.271 2.37 5.871 1.413 9.037-.197-.081-4.462-1.733-8.828-.467-.087-.218-.174-.435-.267-.652 4.345-1.343 7.64-3.932 7.682-3.918.024-.012.006-.054-.035-.054-1.83-3.113-5.02-5.456-8.789-6.377 2.544-1.015 5.5-.746 8.834 1.431zM12 2.4c2.3 0 4.435.75 6.152 2.004-1.888 1.17-4.372 2.766-7.288 3.997-2.005-3.54-3.344-6.522-3.49-6.747C8.338 2.558 10.107 2.4 12 2.4z"/>
      </svg>
    </a>

    {/* LinkedIn */}
    <a href="https://www.linkedin.com" target="_blank" className="hover:text-blue-700 transition-transform transform hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.978 0 1.778-.774 1.778-1.729V1.729C24 .774 23.203 0 22.225 0zM7.061 20.452H3.545V9.036h3.516v11.416zM5.303 7.547c-1.126 0-2.043-.92-2.043-2.054 0-1.135.917-2.054 2.043-2.054s2.043.919 2.043 2.054c0 1.134-.917 2.054-2.043 2.054zm15.149 12.905h-3.514v-5.609c0-1.337-.026-3.06-1.863-3.06-1.863 0-2.148 1.454-2.148 2.958v5.711h-3.515V9.036h3.377v1.561h.048c.471-.891 1.622-1.831 3.338-1.831 3.566 0 4.222 2.345 4.222 5.39v6.256z"/>
      </svg>
    </a>
  </div>
</div>

            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-t border-gray-700 mt-8 sm:mt-10 pt-4 text-center text-xs sm:text-sm text-gray-200">
          <p>© Copyright 2025 Foodu. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
