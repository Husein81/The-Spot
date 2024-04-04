/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error('Error parsing cart items from localStorage:', error);
      }
    }
  }, []);

  const addItemToCart = (newItem) => {
      const existingItem =cartItems.find((item) => item._id === newItem._id);
      if (existingItem > 0) {
        setCartItems((prevItems) =>
        prevItems.map((item) =>
        item._id === newItem._id ? { ...item, qty: item.qty + 1 } : item
        )
        );
      } else {
        setCartItems(prev => [...prev, newItem]);
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
    
    };
    
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      console.error('Quantity cannot be zero or negative');
      return; 
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === productId ? { ...item, qty: newQuantity } : item))
    );
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item._id === productId) {
          if (item.qty > 1) {
            return [...acc, { ...item, qty: item.qty - 1 }];
          } else {
            return acc;
          }
        } else {
          return [...acc, item];
        }
      }, [])
    );
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };
  
  
  const clearCart = () => setCartItems([]);
  
  const contextValue = {
    cartItems,
    addItemToCart,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
