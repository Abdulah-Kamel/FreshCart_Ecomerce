import { createSlice } from "@reduxjs/toolkit";

let x = { counter: 0 };
let counterSlice = createSlice({
  name: "counter",
  initialState: x,
  reducers: {
    increase: (state, action) => {
      state.counter += 1;
    },
    decrease: (state, action) => {
      state.counter -= 1;
    },
    increaseByAmount: (state,action) => {
      state.counter+=action.payload
    }
  },
});

export let counterReducer = counterSlice.reducer;
export let { increase, decrease, increaseByAmount } = counterSlice.actions;
