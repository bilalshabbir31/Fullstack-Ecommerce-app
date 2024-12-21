import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice/index";
import ShopProductsSlice from "./shop/product-slice/index";
import ShopCartSlice from "./shop/cart-slice/index";
import ShopAddressSlice from "./shop/address-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: AdminProductsSlice,
    shopProducts: ShopProductsSlice,
    shopCart: ShopCartSlice,
    shopAddress: ShopAddressSlice,
  },
});

export default store;
