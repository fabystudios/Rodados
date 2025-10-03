import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onCartClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); // 👈 detecta ruta activa

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Inicio", path: "/" },
    { text: "Productos", path: "/productos" },
    { text: "Nosotros", path: "/nosotros" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <img src="../assets/logo-ppal.png" alt="MiTienda Logo" style={{ height: 80 }} />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {item.text === "Inicio" && (
              <ListItemIcon
                sx={{
                  minWidth: "30px",
                  color: "primary.main",
                }}
              >
                <HomeIcon sx={{ fontSize: 25 }} />
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                color: location.pathname === item.path ? "primary.main" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(135deg, #59f720 0%, #108e1c 100%)",
          boxShadow: "0 4px 20px rgba(0, 102, 255, 0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo izquierda */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.4)" },
            }}
          >
            <img src="../assets/logo-ppal.png" alt="MiTienda Logo" style={{ height: 80 }} />
          </Box>

          {/* Texto marca */}
          <Box
            sx={{
              flexGrow: 1,
              display: { sm: "flex" },
              justifyContent: "left",
              px: 2,
              py: 1,
              transition: "filter 0.2s",
              "&:hover": { filter: "brightness(1.3)" },
            }}
          >
            <img src="../assets/texto-marca.png" alt="Marca" style={{ height: 50 }} />
          </Box>

          {/* Menú escritorio derecha */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  borderBottom: location.pathname === item.path ? "3px solid #ff9800" : "none", // 👈 barrita naranja
                  borderRadius: 0,
                  fontWeight: location.pathname === item.path ? "bold" : "normal",
                }}
              >
                {item.text === "Inicio" ? <HomeIcon sx={{ fontSize: 25 }} /> : item.text}
              </Button>
            ))}

            {/* Carrito (icono siempre visible en desktop) */}
            {/* <IconButton color="inherit" onClick={onCartClick}>
              <ShoppingCartIcon />
            </IconButton> */}
          </Box>

          {/* Menú móvil */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
