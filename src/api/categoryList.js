import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryList = createAsyncThunk("/review/new", async () => {
  try {
    const URL = `https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099`;
    const response = await axios.get(URL).then((response) => response.data);
    return response;
  } catch (error) {
    throw error?.response?.data?.message;
  }
});
