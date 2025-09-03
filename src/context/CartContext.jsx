import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [numsItems, setNumsItems] = useState(() => {
    const storedCount = localStorage.getItem("numsItems");
    return storedCount ? JSON.parse(storedCount) : 0;
  });

  // احسب إجمالي السعر
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // Sync cart & numsItems مع localStorage
  useEffect(() => {
    // numsItems = إجمالي الكميات، وليس عدد العناصر المميزة فقط
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    setNumsItems(totalQuantity);

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("numsItems", JSON.stringify(totalQuantity));
  }, [cart]);

  // إضافة منتج للسلة (يدعم تحديد الكمية)
  async function addToCart(productId, quantity = 1) {
    try {
      // احضر بيانات المنتج من API
      const res = await axios.get(`https://dummyjson.com/products/${productId}`);
      const productData = res.data;

      setCart((prev) => {
        const existingIndex = prev.findIndex((it) => it.id === productData.id);
        if (existingIndex !== -1) {
          // المنتج موجود: زد الكمية
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        // المنتج جديد: أضِفه مع البيانات الضرورية فقط
        const newItem = {
          id: productData.id,
          title: productData.title,
          price: productData.price,
          thumbnail: productData.thumbnail || productData.images?.[0] || "",
          quantity,
        };
        return [...prev, newItem];
      });
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }

  // تحديث كمية منتج مباشرة
  function updateQuantity(productId, newQuantity) {
    setCart((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((it) => it.id !== productId);
      }
      return prev.map((it) =>
        it.id === productId ? { ...it, quantity: newQuantity } : it
      );
    });
  }

  // زيادة/تقليل الكمية خطوة واحدة
  function increaseQuantity(productId) {
    updateQuantity(
      productId,
      (cart.find((it) => it.id === productId)?.quantity || 0) + 1
    );
  }

  function decreaseQuantity(productId) {
    const current = cart.find((it) => it.id === productId)?.quantity || 0;
    updateQuantity(productId, current - 1);
  }

  // حذف منتج من السلة
  function removeFromCart(productId) {
    setCart((prev) => prev.filter((it) => it.id !== productId));
  }

  // تفريغ السلة
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        numsItems,
        cartTotal,
        addToCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
