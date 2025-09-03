import { createContext, useEffect, useMemo, useState } from "react";

export const WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const count = useMemo(() => wishlist.length, [wishlist]);

  function isInWishlist(productId) {
    return wishlist.some((it) => it.id === productId);
  }

  function addToWishlist(product) {
    setWishlist((prev) => {
      if (prev.some((it) => it.id === product.id)) return prev;
      const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0] || "",
      };
      return [...prev, item];
    });
  }

  function removeFromWishlist(productId) {
    setWishlist((prev) => prev.filter((it) => it.id !== productId));
  }

  function toggleWishlist(product) {
    setWishlist((prev) => {
      if (prev.some((it) => it.id === product.id)) {
        return prev.filter((it) => it.id !== product.id);
      }
      const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0] || "",
      };
      return [...prev, item];
    });
  }

  function clearWishlist() {
    setWishlist([]);
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, count, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}



