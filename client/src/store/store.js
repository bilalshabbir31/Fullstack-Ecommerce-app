import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsReducer from "./admin/product-slice/index";
import ShopProductsReducer from "./shop/product-slice/index";
import ShopCartReducer from "./shop/cart-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsReducer,
    shopProducts: ShopProductsReducer,
    shopCart: ShopCartReducer,
  },
});

export default store;
