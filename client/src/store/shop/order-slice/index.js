import axiosObj from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  isLoading: false,
  orderId: null,
  orders: [],
  order: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axiosObj.post(
      "/shop/order/create-checkout-session",
      orderData
    );
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ sessionId, orderId }) => {
    const response = await axiosObj.post("/shop/order/checkout-success", {
      sessionId,
      orderId,
    });
    return response.data;
  }
);

export const getOrder = createAsyncThunk(
  "/order/getOrder",
  async (id) => {
    const response = await axiosObj.post(`/shop/order/${id}`);
    return response.data;
  }
);

export const fetchAllOrdersByUserId = createAsyncThunk(
  "/order/fetchAllOrdersByUserId",
  async (userId) => {
    const response = await axiosObj.post(`/shop/order/list/${userId}`);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        (state.isLoading = false), (state.sessionId = action.payload.sessionId);
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        (state.isLoading = false), (state.sessionId = null);
        state.orderId = null;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state) => {
        state.isLoading = false;
        state.order = null;
      })
      .addCase(fetchAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      });
  },
});

export default shoppingOrderSlice.reducer;
