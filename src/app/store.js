import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/orderSlice";
import userReducer from "../features/user/userSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	product: productReducer,
	auth: authReducer,
	cart: cartReducer,
	orders: orderReducer,
	user: userReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
