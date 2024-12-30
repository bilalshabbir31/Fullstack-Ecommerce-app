import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImages: [],
};

export const fetchFeatureImages = createAsyncThunk(
  "/feature/fetchFeatureImages",
  async () => {
    const response = await axiosObj.get("/common/feature/");
    return response?.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      const response = await axiosObj.post("/common/feature/", { image });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImages = action.payload.data;
      })
      .addCase(fetchFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImages = [];
      });
  },
});

export default commonSlice.reducer;
