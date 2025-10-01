import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header({ onCartClick }) {
return (
    <AppBar position="static">
        <Toolbar>
            <img
                src="../images/logo-ppal.png"
                alt="Logo"
                style={{
                    height: 50,
                    marginRight: 16,
                    transition: "transform 0.2s",
                    cursor: "pointer"
                }}
                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            />
            <img
                src="./assets/image-5.png"
                alt="Brand"
                style={{
                    height: 40,
                    marginRight: 16,
                    transition: "transform 0.2s",
                    cursor: "pointer"
                }}
                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.2)")}
                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            />
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
                    fontWeight: 400,
                    letterSpacing: 0.5,
                }}
            >
                {/* <img
                    src="../images/logo-coni.png"
                    alt="Coni"
                    style={{ height: 90, verticalAlign: "middle", marginLeft: 0 }}
                /> */}
            </Typography>

            <IconButton color="inherit" onClick={onCartClick}>
                <ShoppingCartIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
);
}
