import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cake, SearchCakeParams } from "./types";
import axios from "axios";

export const fetchCakes = createAsyncThunk<Cake[], SearchCakeParams>(
   "cake/fetchCakesStatus",
   async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<Cake[]>(
         `https://676c1a4abc36a202bb86b884.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      return data;
   }
);
