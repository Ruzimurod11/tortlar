import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cake, CakeSliceState, Status } from "./types";
import { fetchCakes } from "./asyncActions";

const initialState: CakeSliceState = {
   items: [],
   status: Status.LOADING,
};

export const cakeSlice = createSlice({
   name: "cake",
   initialState,
   reducers: {
      setItems: (state, action: PayloadAction<Cake[]>) => {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchCakes.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING;
         })
         .addCase(fetchCakes.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
         })
         .addCase(fetchCakes.rejected, (state, action) => {
            state.items = [];
            state.status = Status.ERROR;
         });
   },
});

export const { setItems } = cakeSlice.actions;

export default cakeSlice.reducer;
