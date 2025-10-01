import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart({
  open,
  onClose,
  items,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
}) {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={340} p={2} display="flex" flexDirection="column" height="100%">
        {/* 🔹 Total arriba en un recuadro elegante */}
     <Paper
  elevation={3}
  sx={{
    p: 2,
    mb: 2,
    bgcolor: "primary.main",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // 🔹 texto izquierda, imagen derecha
  }}
>
  <Box>
    <Typography variant="h6">Total del carrito</Typography>
    <Typography variant="h5" fontWeight="bold">
      ${total}
    </Typography>
  </Box>

  {/* 🔹 Imagen mascota */}
  <Box
    component="img"
    src="../images/mascota.png"
    alt="Mascota"
    sx={{ width: 80, height: 80, ml: 2 }}
  />
</Paper>


        <Divider sx={{ mb: 2 }} />

        {/* 🔹 Lista de productos */}
        <Box flexGrow={1} overflow="auto">
          {items.length === 0 ? (
            <Typography variant="body2">Tu carrito está vacío</Typography>
          ) : (
            <List>
              {items.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton size="small" onClick={() => decreaseQty(item.id)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          color: "primary.main",
                          fontWeight: "bold",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" onClick={() => increaseQty(item.id)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                      {/* 🔹 Tachito rojo */}
                      <IconButton color="error" onClick={() => removeItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} x ${item.quantity} = $${item.price * item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 🔹 Botón vaciar carrito con laterales redondeados */}
        {items.length > 0 && (
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ borderRadius: "20px" }}
            onClick={clearCart}
          >
            Vaciar carrito
          </Button>
        )}
      </Box>
    </Drawer>
  );
}
