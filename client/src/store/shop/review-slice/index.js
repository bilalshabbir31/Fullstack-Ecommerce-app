import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/review/addReview",
  async (data) => {
    const response = await axiosObj.post("/shop/review/", {
      data,
    });
    return response?.data;
  }
);

export const fetchReviews = createAsyncThunk(
  "/reviews/fetchReviews",
  async (id) => {
    const response = await axiosObj.get(`/shop/review/${id}`);
    return response?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state,action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = []
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
