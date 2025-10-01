import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import "../styles/ProductList.css";

export default function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar productos desde la API
  useEffect(() => {
    fetch("https://68362e14664e72d28e401640.mockapi.io/producto")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Cargando productos...
        </Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={2} className="product-list-container">
      {products.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p.id}>
          <Card
            className="product-card"
            sx={{
              borderRadius: "28px", // MD3 default rounded corners
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-8px) scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              height="155"
              image={p.image}
              alt={p.name}
              className="product-image"
              sx={{ borderTopLeftRadius: "28px", borderTopRightRadius: "28px" }}
            />
            <CardContent>

              <Typography variant="h6" className="product-name">
                {p.name}
              </Typography>
              <Typography variant="body2" className="product-price">
                ${p.price}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 1, borderRadius: "20px" }}
                onClick={() => onAddToCart(p)}
                className="add-to-cart-btn"
              >
                Agregar al carrito
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    
  );
}
