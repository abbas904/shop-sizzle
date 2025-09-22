import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    async function getDetails() {
      try {
        setIsLoading(true);
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);

        const categoryRes = await axios.get(
          `https://dummyjson.com/products/category/${res.data.category}`
        );
        const filtered = categoryRes.data.products.filter(
          (p) => p.id !== parseInt(id)
        );
        setSuggestedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast.success("Product added to cart!");
  };

  // Skeleton Component
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96" />
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Skeleton className="w-3/4 h-8" />
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-1/4 h-6" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="w-24 h-10" />
              <Skeleton className="flex-1 h-10" />
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Skeleton className="w-1/3 h-8 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-96 sm:h-[28rem] md:h-96 object-contain rounded-lg"
            />
            <button
              onClick={() => product && toggleWishlist(product)}
              className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Toggle wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={product && isInWishlist(product.id) ? "red" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6 sm:w-7 sm:h-7"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold truncate">{product.title}</h1>
              <p className="mt-2 text-gray-600 line-clamp-3">{product.description}</p>
              <div className="flex items-center mt-2 gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ${i < Math.round(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="text-gray-600">({product.rating})</span>
              </div>
              <p className="text-2xl font-bold mt-4">${product.price}</p>
            </div>

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full">
              {/* Quantity */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-violet-500 text-white font-bold hover:bg-violet-700 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 bg-white text-gray-900 font-bold flex items-center justify-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2 bg-violet-500 text-white font-bold hover:bg-violet-700 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors w-full sm:w-auto text-center"
              >
                🛒 Add to Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={() => product && toggleWishlist(product)}
                className={`flex items-center justify-center px-4 py-3 rounded-lg border ${
                  product && isInWishlist(product.id)
                    ? "border-rose-600 text-rose-600 bg-rose-50 hover:bg-rose-100"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                } w-full sm:w-auto`}
              >
                <i className={`fa-solid fa-heart ${product && isInWishlist(product.id) ? "text-rose-600" : "text-gray-400"}`}></i>
                <span className="ml-2 truncate">
                  {product && isInWishlist(product.id) ? "Wishlisted" : "Add to Wishlist"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {suggestedProducts.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`}>
                  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-40 sm:h-48 object-contain rounded-lg"
                    />
                    <h3 className="mt-2 font-semibold truncate">{p.title}</h3>
                    <p className="text-gray-600 mt-1">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
