import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/review/addReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosObj.post("/shop/review/", formData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
