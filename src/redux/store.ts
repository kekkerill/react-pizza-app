import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice.ts";
import cartReducer from "./slices/cartSlice.ts";
import pizzaReducer from "./slices/pizzasSlice.ts";
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
