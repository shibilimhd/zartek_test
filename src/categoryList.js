import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Container, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { getCategoryList } from "./api/categoryList";
import { cartCount } from "./store/categoryList";
import Header from "./header";

function CategoryList() {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => ({
    categoryList: state.category.categoryList[0],
  }));

  const [activeTab, setActiveTab] = useState("11");

  const [dishes, setDishes] = useState([]);

  const handleCart = (selectedDish, type) => {
    if (type === "add") {
      // update current dish data
      const currentDish = dishes?.map((filteredDish) =>
        filteredDish?.dish_id === selectedDish?.dish_id
          ? {
              ...filteredDish,
              count: selectedDish?.count ? selectedDish?.count + 1 : 1,
            }
          : filteredDish
      );
      setDishes(currentDish);
    } else if (type === "remove") {
      const currentDish = dishes?.map((currentDish) =>
        currentDish?.dish_id === selectedDish?.dish_id
          ? {
              ...currentDish,
              count: selectedDish?.count ? selectedDish?.count - 1 : 0,
            }
          : currentDish
      );
      setDishes(currentDish);
    }
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  useEffect(() => {
    const filteredDishesByCategory = categoryList?.table_menu_list?.filter(
      (menuCategory) => menuCategory?.menu_category_id === activeTab
    );
    const modifiedDishData =
      filteredDishesByCategory?.[0]?.category_dishes?.map((dishItem) => ({
        ...dishItem,
        count: 0,
      }));
    setDishes(modifiedDishData);
  }, [activeTab, categoryList]);

  useEffect(() => {
    if (dishes?.length >= 1) {
      const sumOfCounts = dishes?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
      }, 0);
      dispatch(cartCount(sumOfCounts));
    }
  }, [dishes, dispatch]);

  return (
    <Grid>
      <Header name={categoryList?.restaurant_name} />
      <Container maxWidth="xl">
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={5}
          borderBottom={"2px solid grey"}
        >
          {categoryList?.table_menu_list?.map((item, key) => (
            <Box width={"50%"} key={key}>
              <Typography
                color={
                  activeTab === item?.menu_category_id ? "#d32f2f" : "grey"
                }
                variant="h6"
                fontWeight={"bold"}
                borderBottom={
                  activeTab === item?.menu_category_id
                    ? "3px solid #d32f2f"
                    : "none"
                }
                display={"flex"}
                justifyContent={"center"}
                sx={{ cursor: "pointer" }}
                position={"relative"}
                top={2}
                onClick={() => setActiveTab(item?.menu_category_id)}
              >
                {item?.menu_category}
              </Typography>
            </Box>
          ))}
        </Box>
        {dishes?.map((dish, key) => (
          <Grid
            display={"flex"}
            justifyContent={"space-between"}
            borderBottom={"2px solid grey"}
            key={key}
          >
            <Box display={"flex"} pt={1} width={"50%"}>
              <Box sx={{ position: "relative" }}>
                <CropSquareIcon
                  color={dish?.dish_Availability ? "success" : "error"}
                />
                <FiberManualRecordIcon
                  color={dish?.dish_Availability ? "success" : "error"}
                  sx={{
                    position: "absolute",
                    left: "4px",
                    top: "4px",
                    fontSize: "16px",
                  }}
                />
              </Box>
              <Box mx={1}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {dish?.dish_name}
                </Typography>
                <Typography variant="button">
                  {dish?.dish_currency} {dish?.dish_price}
                </Typography>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  {dish?.dish_description}
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    backgroundColor: "green",
                    borderRadius: "50px",
                    width: "150px",
                    height: "30px",
                  }}
                  my={1}
                >
                  <Button
                    // disabled={cartItemTotal === 0}
                    onClick={() => handleCart(dish, "remove")}
                  >
                    <RemoveIcon sx={{ color: "white" }} />
                  </Button>
                  <Typography sx={{ color: "white" }}>{dish?.count}</Typography>
                  <Button onClick={() => handleCart(dish, "add")}>
                    <AddIcon sx={{ color: "white" }} />
                  </Button>
                </Box>
                <Typography pb={1} variant="body2" color={"#d32f2f"}>
                  {dish?.dish_Availability
                    ? dish?.addonCat?.length > 0
                      ? "Customization available"
                      : ""
                    : "Not Available"}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography variant="button" px={15}>
                {dish?.dish_calories} Calories
              </Typography>
              <img
                src={dish?.dish_image}
                alt=""
                width={"110px"}
                height={"90px"}
                style={{ borderRadius: "10px" }}
              />
            </Box>
          </Grid>
        ))}
      </Container>
    </Grid>
  );
}

export default CategoryList;
