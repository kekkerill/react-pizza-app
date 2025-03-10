import { createSlice } from "@reduxjs/toolkit";
import { GetDataFromLS } from "../../utils/GetDataFromLS.ts";

interface CartItem {
  id: number;
  price: number;
  count: number;
}

interface CartState {
  CartItems: CartItem[];
  totalPrice: number;
}

const data = GetDataFromLS();
const initialState: CartState = {
  CartItems: data.items,
  totalPrice: data.totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.CartItems.find(
        (item: { id: number }) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.CartItems.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.CartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem: (state, action) => {
      state.CartItems = state.CartItems.filter(
        (item) => item.id !== action.payload
      );
      state.totalPrice = state.CartItems.reduce((sum, obj) => {
        return obj.price * obj.count - sum;
      }, 0);
    },
    clearCart: (state) => {
      state.CartItems = [];
      state.totalPrice = 0;
    },
    minusItem: (state, action) => {
      const findItem = state.CartItems.find(
        (item) => item.id === action.payload
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.CartItems = state.CartItems.filter(
          (item) => item.id !== action.payload
        );
      }
      state.totalPrice = state.CartItems.reduce((sum, obj) => {
        return obj.price * obj.count - sum;
      }, 0);
    },
  },
});

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
