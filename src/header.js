import React from "react";
import { Grid, Typography, Box, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";

function Header({ name }) {
  const { cart } = useSelector((state) => ({
    cart: state.category.cartTotal,
  }));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 0,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <Grid>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        pt={3}
        alignItems={"center"}
      >
        <Typography color={"grey"} variant="h5" fontWeight={"bold"}>
          {name}
        </Typography>
        <Box display={"flex"}>
          <Typography color={"grey"} px={1}>
            My Orders
          </Typography>
          <StyledBadge
            badgeContent={cart}
            color="error"
            sx={{ marginRight: "10px" }}
          >
            <ShoppingCartIcon color="disabled" />
          </StyledBadge>
        </Box>
      </Box>
    </Grid>
  );
}

export default Header;
