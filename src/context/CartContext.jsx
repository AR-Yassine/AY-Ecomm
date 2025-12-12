import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart when user changes
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.id === user.id);
    setCart(found?.cart || []);
  }, [user]);

  // Save cart to user
  useEffect(() => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updated = users.map(u =>
      u.id === user.id ? { ...u, cart } : u
    );

    localStorage.setItem("users", JSON.stringify(updated));
  }, [cart, user]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const clearCart = () => setCart([]);

  const getTotalQuantity = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
