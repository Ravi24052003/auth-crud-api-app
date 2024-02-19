import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import signupReducer from "../features/signup/signupSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import profileReducer from "../features/profile/profileSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
      login: loginReducer,
      signup: signupReducer,
      products: productsReducer,
      cart: cartReducer,
      profile: profileReducer,
      users: usersReducer
    }
})