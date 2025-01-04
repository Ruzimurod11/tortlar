import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/slice";
import filterSlice from "./slices/filter/slice";
import cakeSlice from "./slices/cake/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
   reducer: {
      filter: filterSlice,
      cart: cartSlice,
      cake: cakeSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
