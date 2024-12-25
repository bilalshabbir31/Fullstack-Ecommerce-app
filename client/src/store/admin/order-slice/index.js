import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orders: [],
  order: null,
};

export const getOrder = createAsyncThunk("/orders/getOrder", async (id) => {
  const response = await axiosObj.get(`/admin/orders/${id}`);
  return response.data;
});

export const fetchAllOrders = createAsyncThunk(
  "/orders/fetchAllOrders",
  async () => {
    const response = await axiosObj.get("/admin/orders/");
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/orders/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axiosObj.put(`/admin/orders/${id}`, {
      orderStatus,
    });
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "AdminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.data;
      })
      .addCase(getOrder.rejected, (state) => {
        state.isLoading = false;
        state.order = null;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
