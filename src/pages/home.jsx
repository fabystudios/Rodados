// src/pages/Home.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", mt: { xs: 3, md: 6 } }}>
        <img
          src="../assets/logotipo-top.png"
          alt="Rodados eShop"
          style={{
            width: "100%",
            maxWidth: 400,
            height: "auto"
          }}
        />
        <Typography variant="h4" mt={2} fontSize={{ xs: "1.5rem", md: "2.125rem" }}>
          ¡Bienvenido a Rodados eShop!
        </Typography>
        <Typography variant="body1" mt={1} fontSize={{ xs: "1rem", md: "1.25rem" }}>
          Explora nuestros productos y descubre las mejores ofertas.
        </Typography>
      </Box>
    </Container>
  );
}


