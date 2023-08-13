import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "./baseUrl";

export const getCategoryList = createAsyncThunk("/review/new", async () => {
  try {
    const response = get("/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099");
    return response;
  } catch (error) {
    throw error?.message;
  }
});
