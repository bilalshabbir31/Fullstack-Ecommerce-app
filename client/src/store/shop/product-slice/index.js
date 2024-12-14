import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  product: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts",
  async ({ filtersParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filtersParams,
      sortBy: sortParams,
    });
    const response = await axiosObj.get(`/shop/products/?${query}`);
    return response?.data;
  }
);

export const fetchProduct = createAsyncThunk(
  "/products/fetchProduct",
  async (id) => {
    const response = await axiosObj.get(`/shop/products/${id}`);
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
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
        state.product = null;
      });;
  },
});

export default shoppingProductSlice.reducer;
