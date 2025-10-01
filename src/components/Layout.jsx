import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import ProductList from "./ProductList";
import Cart from "./Cart";

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ addToCart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const itemExists = prev.find((item) => item.id === product.id);
      if (itemExists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header onCartClick={() => setCartOpen(true)} />

      <Box component="main" flexGrow={1} p={2}>
        <ProductList onAddToCart={addToCart} />
      </Box>

      <Footer />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </Box>
  );
}
