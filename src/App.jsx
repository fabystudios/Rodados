// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductDetail from "./pages/productDetails"; //

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // ✅ Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Funciones del carrito
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
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        {/* 🔹 Header fijo en todas las páginas */}
        <Header onCartClick={() => setCartOpen(true)} />

        {/* 🔹 Contenido dinámico según ruta */}
        <Box component="main" flexGrow={1} p={2}>
          <Routes>
            <Route path="/" element={<Home />} />
        <Route
          path="/productos"
          element={
            <Products
              cartItems={cartItems}
              addToCart={addToCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/productos/:id"
          element={
            <ProductDetail
              cartItems={cartItems}
              onAddToCart={addToCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          }
        />

            <Route path="/nosotros" element={<About />} />
          </Routes>
        </Box>

        {/* 🔹 Footer fijo en todas las páginas */}
        <Footer />

        {/* 🔹 Drawer del carrito */}
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
    </Router>
  );
}
