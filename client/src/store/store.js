import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsReducer from "./admin/product-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsReducer
  },
});

export default store;
