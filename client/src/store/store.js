import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice/index";
import ShopProductsSlice from "./shop/product-slice/index";
import ShopCartSlice from "./shop/cart-slice/index";
import ShopAddressSlice from "./shop/address-slice/index";
import ShopOrderSlice from "./shop/order-slice/index";
import AdminOrderSlice from "./admin/order-slice/index";
import ShopSearchSlice from "./shop/search-slice/index";
import ShopReviewSlice from "./shop/review-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: AdminProductsSlice,
    adminOrder: AdminOrderSlice,
    shopProducts: ShopProductsSlice,
    shopCart: ShopCartSlice,
    shopAddress: ShopAddressSlice,
    shopOrder: ShopOrderSlice,
    shopSearch: ShopSearchSlice,
    shopReview: ShopReviewSlice,
  },
});

export default store;
