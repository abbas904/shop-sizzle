import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, cartTotal } =
    useContext(CartContext);

  const totalItems = useMemo(() => cart.reduce((sum, it) => sum + it.quantity, 0), [cart]);

  if (cart.length === 0)
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500"
            >
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6">Start shopping to add products to your cart</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );

  return (
    <div className="bg-violet-50 min-h-screen py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
              />
            </svg>
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              const itemSubtotal = (item.price * item.quantity).toFixed(2);
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto min-w-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="relative group">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                          {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                        </h3>
                        {item.title.length > 20 && (
                          <span className="absolute left-0 top-full mt-1 w-max p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {item.title}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 mt-4 sm:mt-0 w-full sm:w-auto flex-shrink-0">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        className="px-2 sm:px-3 py-1 rounded-lg hover:bg-white disabled:opacity-50 text-sm sm:text-base"
                      >
                        -
                      </button>
                      <span className="w-8 sm:w-10 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 sm:px-3 py-1 rounded-lg hover:bg-white text-sm sm:text-base"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-gray-700 font-semibold text-sm sm:text-base">${itemSubtotal}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 p-1 sm:p-2 rounded-full border border-red-500 flex-shrink-0"
                        aria-label="Remove product"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 h-fit">
            <h3 className="text-base sm:text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Products</span>
                <span className="font-medium">{cart.length}</span>
              </div>
            </div>
            <hr className="my-3 sm:my-4" />
            <div className="flex justify-between text-sm sm:text-base">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-4 sm:mt-5 inline-flex w-full items-center justify-center bg-violet-600 hover:bg-violet-700 text-white py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
            >
              Proceed to Checkout
            </Link>
            <p className="text-xs text-gray-500 mt-2 sm:mt-3">
              You can modify quantities or remove products before checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
