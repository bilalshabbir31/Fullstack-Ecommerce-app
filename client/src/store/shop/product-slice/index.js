import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts",
  async () => {
    const response = await axiosObj.get("/shop/products/");
    return response?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default shoppingProductSlice.reducer;
