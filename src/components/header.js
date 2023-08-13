import React from "react";
import { Grid, Typography, Box, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import { useDevice } from "../hooks/useResponsive";

function Header({ name }) {
  const { isMobile } = useDevice();
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
    <Box>
      <Grid pt={3} className="header-main">
        {isMobile ? (
          <Typography variant="h5" className="header-name">
            <ArrowBackIcon sx={{ pr: "10px" }} />
            {name}
          </Typography>
        ) : (
          <Typography variant="h5" className="header-name">
            {name}
          </Typography>
        )}
        <Box display={"flex"}>
          <Typography fontFamily={"TomatoGrotesk"} color={"grey"} px={1}>
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
      </Grid>
    </Box>
  );
}

export default Header;
