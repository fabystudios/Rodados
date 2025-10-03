// src/pages/About.jsx
import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Título principal */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Sobre Nosotros
        </Typography>

        {/* Sección descriptiva */}
        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: "800px", mx: "auto", mb: 6 }}
        >
          Somos una tienda comprometida en ofrecer los mejores productos de calidad.
          Nuestro objetivo es brindar a cada cliente una experiencia de compra
          sencilla, rápida y confiable. Creemos en la innovación, la cercanía con
          nuestra comunidad y en la construcción de relaciones duraderas basadas en la confianza.
        </Typography>

        {/* Grid centrado responsivamente */}
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Card elevation={3} sx={{ borderRadius: "20px", width: { xs: "100%", md: "400px" } }}>
              <CardMedia
                component="img"
                height="300"
                image="../../assets/team.jpg"
                alt="Nuestro equipo"
                sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Nuestro Equipo
                </Typography>
                <Typography variant="body2">
                  Un grupo de profesionales apasionados que trabajan cada día para
                  brindarte la mejor atención y el mejor catálogo de productos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Card elevation={3} sx={{ borderRadius: "20px", width: { xs: "100%", md: "400px" } }}>
              <CardMedia
                component="img"
                height="300"
                image="../../assets/office.jpg"
                alt="Nuestra tienda"
                sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Nuestra Tienda
                </Typography>
                <Typography variant="body2">
                  Un espacio donde cada detalle está pensado para que disfrutes
                  de una experiencia de compra única y cercana, tanto online como en persona.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
