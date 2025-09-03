import React, { useContext } from 'react'
import { WishlistContext } from '../context/WishlistContext'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">قائمة المفضلة فارغة</h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">أضف بعض المنتجات إلى المفضلة للرجوع إليها لاحقاً.</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base"
          >
            تصفح المنتجات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-violet-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">المفضلة</h1>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-300 text-sm sm:text-base"
          >
            تفريغ المفضلة
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((p) => (
            <div
              key={p.id}
              className="rounded-xl shadow-lg overflow-hidden bg-white flex flex-col transition-transform transform hover:scale-105 duration-300"
            >
              <div className="relative w-full h-48 sm:h-56">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
                <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-2">{p.title}</h3>
                <p className="text-violet-600 font-bold text-lg sm:text-xl">${p.price}</p>
                <div className="mt-auto grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => addToCart(p.id, 1)}
                    className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition-colors duration-300 text-xs sm:text-sm"
                  >
                    أضف للسلة
                  </button>
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-xs sm:text-sm"
                  >
                    إزالة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

