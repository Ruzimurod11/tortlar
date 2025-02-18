import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
   totalPrice,
   items,
};

export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
         const findItem = state.items.find(
            (obj) =>
               obj.id === action.payload.id &&
               obj.type === action.payload.type &&
               obj.size === action.payload.size
         );

         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }

         state.totalPrice = calcTotalPrice(state.items);
      },
      minusItem: (state, action: PayloadAction<CartItem>) => {
         const findItem = state.items.find(
            (obj) =>
               obj.id === action.payload.id &&
               obj.type === action.payload.type &&
               obj.size === action.payload.size
         );

         if (findItem) {
            findItem.count--;
         }

         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.size * obj.count + sum;
         }, 0);
      },
      removeItem: (state, action: PayloadAction<CartItem>) => {
         const findItem = state.items.find(
            (obj) =>
               obj.id === action.payload.id &&
               obj.type === action.payload.type &&
               obj.size === action.payload.size
         );

         if (findItem) {
            state.items = state.items.filter((obj) => obj !== findItem);
         }

         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.size * obj.count + sum;
         }, 0);

         if (!state.items) {
            state.totalPrice = 0;
         }
      },
      clearItems: (state) => {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
