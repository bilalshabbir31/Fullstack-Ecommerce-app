import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const response = await axiosObj.post("/admin/products/", formData);
    return response?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const response = await axiosObj.get("/admin/products/");
    return response?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const response = await axiosObj.put(`/admin/products/edit/${id}`, formData);

    return response?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const response = await axiosObj.delete(`/admin/products/${id}`);
    return response?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default AdminProductSlice.reducer;
