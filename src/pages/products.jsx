// src/pages/Products.jsx
import Header from "../components/Header";



import React, { useState, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import "../styles/ProductList.css";
export default function Products() {
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
    <>
      {/* ✅ Header con carrito funcionando */}
      {/* <Header onCartClick={() => setCartOpen(true)} /> */}

      <Box sx={{ p: 2 }}>
        <ProductList onAddToCart={addToCart} />

        <Fab
          color="primary"
          aria-label="cart"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCartIcon />
        </Fab>

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
    </>
  );

}
