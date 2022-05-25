import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "../features/coins/cryptoSlice";
import coinSlice from "../features/coin/coinSlice";
import historySlice from "../features/coin/historySlice";

export const store = configureStore({
  reducer: {
    coins: cryptoSlice,
    coin: coinSlice,
    history: historySlice,
  },
});
