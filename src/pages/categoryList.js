import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Container, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/header";
import { getCategoryList } from "../api/categoryList";
import { cartCount } from "../store/categoryList";
import { useDevice } from "../hooks/useResponsive";

function CategoryList() {
  const dispatch = useDispatch();
  const { isMobile } = useDevice();

  const { categoryList, loading } = useSelector((state) => ({
    categoryList: state.category.categoryList[0],
    loading: state.category.loading,
  }));

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

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
    <>
      {loading ? (
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <Stack>
          {!isMobile ? (
            <Container maxWidth="xl">
              <Box border={"1px solid grey"}>
                <Header name={categoryList?.restaurant_name} />
                <Grid
                  mt={5}
                  borderBottom={"2px solid grey"}
                  className="main-div"
                >
                  {categoryList?.table_menu_list?.map((item, key) => (
                    <Box width={"100%"} key={key}>
                      <Typography
                        color={
                          activeTab === item?.menu_category_id
                            ? "#d32f2f"
                            : "grey"
                        }
                        borderBottom={
                          activeTab === item?.menu_category_id
                            ? "3px solid #d32f2f"
                            : "none"
                        }
                        className="category-title"
                        variant="h6"
                        pb={1}
                        onClick={() => setActiveTab(item?.menu_category_id)}
                      >
                        {item?.menu_category}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
                {dishes?.map((dish, key) => (
                  <Grid
                    className="dishes-main-div"
                    borderBottom={"2px solid grey"}
                    key={key}
                  >
                    <Box display={"flex"} pt={1} width={"50%"}>
                      <Box position={"relative"}>
                        <CropSquareIcon
                          color={dish?.dish_Availability ? "success" : "error"}
                        />
                        <FiberManualRecordIcon
                          color={dish?.dish_Availability ? "success" : "error"}
                          fontSize="16px"
                          className="product-icon"
                        />
                      </Box>
                      <Box mx={1}>
                        <Typography fontWeight={"bold"}>
                          {dish?.dish_name}
                        </Typography>
                        <Typography variant="button">
                          {dish?.dish_currency} {dish?.dish_price}
                        </Typography>
                        <Typography variant="body2" color={"grey"}>
                          {dish?.dish_description}
                        </Typography>
                        <Grid className="addOn_div" my={1}>
                          <Button onClick={() => handleCart(dish, "remove")}>
                            <RemoveIcon className="white-color" />
                          </Button>
                          <Typography className="white-color">
                            {dish?.count}
                          </Typography>
                          <Button onClick={() => handleCart(dish, "add")}>
                            <AddIcon className="white-color" />
                          </Button>
                        </Grid>
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
                      <Typography variant="button" px={15} fontWeight={"bold"}>
                        {dish?.dish_calories} Calories
                      </Typography>
                      <img
                        src={dish?.dish_image}
                        alt=""
                        className="dish-image"
                      />
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Container>
          ) : (
            <Stack>
              <Header name={categoryList?.restaurant_name} />
              <Grid
                mt={5}
                borderBottom={"1px solid grey"}
                className="main-div-mob"
              >
                {categoryList?.table_menu_list?.map((item, key) => (
                  <Box width={"100%"} key={key}>
                    <Typography
                      color={
                        activeTab === item?.menu_category_id
                          ? "#d32f2f"
                          : "grey"
                      }
                      borderBottom={
                        activeTab === item?.menu_category_id
                          ? "2px solid #d32f2f"
                          : "none"
                      }
                      variant="body1"
                      className="category-title"
                      onClick={() => setActiveTab(item?.menu_category_id)}
                      pb={1}
                    >
                      {item?.menu_category}
                    </Typography>
                  </Box>
                ))}
              </Grid>
              {dishes?.map((dish, key) => (
                <Grid
                  className="dishes-main-div"
                  borderBottom={"2px solid grey"}
                  key={key}
                >
                  <Box display={"flex"} pt={1} width={"50%"}>
                    <Box position={"relative"}>
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
                      <Typography fontWeight={"bold"} width={"240px"}>
                        {dish?.dish_name}
                      </Typography>
                      <Typography variant="button">
                        {dish?.dish_currency} {dish?.dish_price}
                      </Typography>
                      <Typography variant="body2" color={"gray"}>
                        {dish?.dish_description}
                      </Typography>
                      <Grid className="addOn_div" my={1}>
                        <Button onClick={() => handleCart(dish, "remove")}>
                          <RemoveIcon sx={{ color: "white" }} />
                        </Button>
                        <Typography color={"white"}>{dish?.count}</Typography>
                        <Button onClick={() => handleCart(dish, "add")}>
                          <AddIcon sx={{ color: "white" }} />
                        </Button>
                      </Grid>
                      <Typography pb={1} variant="body2" color={"#d32f2f"}>
                        {dish?.dish_Availability
                          ? dish?.addonCat?.length > 0
                            ? "Customization available"
                            : ""
                          : "Not Available"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    height={"50%"}
                    mt={1}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={"700"}
                      px={"6px"}
                      color={"#302e2e"}
                    >
                      {dish?.dish_calories} Calories
                    </Typography>
                    <img src={dish?.dish_image} alt="" className="dish-image" />
                  </Box>
                </Grid>
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
}

export default CategoryList;
