import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
 
import "../styles/ProductList.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

// Estilos MD3 para Card y Button
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  boxShadow:
    "0px 2px 8px rgba(0,0,0,0.08), 0px 1.5px 6px rgba(0,0,0,0.12)",
  transition: "transform 0.2s cubic-bezier(.4,0,.2,1), box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px) scale(1.02)",
    boxShadow:
      "0px 4px 16px rgba(0,0,0,0.12), 0px 3px 12px rgba(0,0,0,0.16)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "999px",
  width: "100%",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  padding: "10px 0",
  boxShadow: "0px 1px 4px rgba(0,0,0,0.10)",
  background: "linear-gradient(90deg, #6750A4 0%, #D0BCFF 100%)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(90deg, #7F67BE 0%, #B69DF8 100%)",
  },
}));

export default function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://68362e14664e72d28e401640.mockapi.io/producto")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center">
      {products.length === 0 ? (
        <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, textShadow: "2px 2px 8px rgba(0,0,0,0.18)" }}>
            Cargando productos...
          </Typography>
          <img
            src="../assets/spinner.png"
            alt="Cargando"
            style={{ width: 150,  display: "inline-block" }}
          />
        </Box>
      ) : (
        products.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={product.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StyledCard
              sx={{
                height: 380,
                width: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 8px 24px rgba(0,0,0,0.18)", // sombra paralela
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f5f5f5",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      textShadow: "2px 2px 8px rgba(0,0,0,0.18)", // sombra paralela al texto
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      textShadow: "8px 8px 10px rgba(0,0,0,0.18)", // sombra paralela al texto
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
                {/* Botón naranja degradado con marginBottom */}
                <StyledButton
                component={Link}
                to={`/productos/${product.id}`}   // 👈 va al detalle dinámico
                sx={{
                  mb: 2,
                  mt: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  background: "linear-gradient(90deg, #f67207 0%, #FFD180 100%)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(90deg, #fb7500fb 0%, #FFB74D 100%)",
                  },
                }}
                startIcon={<TravelExploreIcon />}
              >
                Ver Detalle
              </StyledButton>

                <StyledButton
                  variant="contained"
                  onClick={() => onAddToCart(product)}
                  sx={{
                    mt: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    textShadow: "1px 1px 6px rgba(0,0,0,0.18)", // sombra paralela al texto del botón
                  }}
                  startIcon={
                    <AddShoppingCartIcon
                      sx={{
                        filter: "drop-shadow(2px 2px 6px rgba(0,0,0,0.18))", // sombra paralela al icono
                      }}
                    />
                  }
                >
                  Agregar al carrito
                </StyledButton>
              </CardContent>
            </StyledCard>
          </Grid>
        ))
      )}
    </Grid>
  );
}
