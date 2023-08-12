import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./categoryList";

export default configureStore({
  reducer: {
    category: CategoryReducer,
  },
});
