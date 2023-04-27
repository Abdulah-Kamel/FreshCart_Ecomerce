import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let geProudcts = createAsyncThunk("proudcts/getProudcts", async () => {
  let { data } = await axios.get(
    "https://route-ecommerce.onrender.com/api/v1/products"
  );
  return data.data;
});
let proudcts = { proudcts: [] };
let proudctSlice = createSlice({
  name: "proudcts",
  initialState: proudcts,
  reducers: {
    getProudcts: (state, action) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("fulfilled", (state,action) => {
      state.proudcts = action.payload;
    });
  },
});

export let proudctReducer = proudctSlice.reducer;
export let { getProudcts } = proudctSlice.actions;
