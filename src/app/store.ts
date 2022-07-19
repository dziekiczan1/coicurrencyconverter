import { configureStore } from "@reduxjs/toolkit";
import { currencyApi } from "../services/currencyApi";

export default configureStore({
  reducer: {
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
});
