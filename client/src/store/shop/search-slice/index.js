import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  results: [],
};

export const searchProducts = createAsyncThunk(
  "/products/searchProducts",
  async (keyword) => {
    const response = await axiosObj.get(`/shop/search/${keyword}`);
    return response?.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isLoading = false;
        state.results = [];
      });
  },
});

export default searchSlice.reducer;