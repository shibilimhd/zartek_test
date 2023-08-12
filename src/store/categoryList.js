import { createSlice } from "@reduxjs/toolkit";
import { getCategoryList } from "../api/categoryList";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    error: {},
    categoryList: [],
    cartTotal: 0,
  },
  //   reducers: {
  //     clearCategoryError: (state) => {
  //       state.error = true;
  //     },
  //   },
  reducers: {
    cartCount: (state, action) => {
      state.cartTotal = action.payload;
    },
  },
  extraReducers: {
    [getCategoryList.pending]: (state) => {
      state.loading = true;
    },
    [getCategoryList.fulfilled]: (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
      state.error = {};
    },
    [getCategoryList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export const { cartCount } = categorySlice.actions;

export default categorySlice.reducer;
