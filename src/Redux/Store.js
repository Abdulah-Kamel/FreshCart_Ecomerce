import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { proudctReducer } from "./ProudctSlice";

export let Store = configureStore({
  reducer: {
    counter: counterReducer,
    proudcts: proudctReducer,
  },
});
