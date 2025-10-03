import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StyledButton from "../components/StyledButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Fab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cart from "../components/Cart";

export default function ProductDetail({
  onAddToCart,
  cartItems,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch(`https://68362e14664e72d28e401640.mockapi.io/producto/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error al cargar producto:", err));
  }, [id]);

  if (!product) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography>Cargando detalle...</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <StyledButton
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, width: 180 }}
      >
        Volver
      </StyledButton>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          sx={{
            width: { xs: "100%", md: 300 },
            objectFit: "contain",
            borderRadius: 2,
            mr: { md: 3 },
          }}
        />

        <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description || "Este producto no tiene descripción disponible."}
          </Typography>

          <StyledButton
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito
          </StyledButton>
        </Box>
      </Card>

      {/* Botón flotante para abrir carrito */}
      <Fab
        color="primary"
        aria-label="cart"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCartIcon />
      </Fab>

      {/* Drawer del carrito */}
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
