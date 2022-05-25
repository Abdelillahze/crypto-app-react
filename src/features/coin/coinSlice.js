import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoin = createAsyncThunk("coin/fetchCoin", (payload) => {
  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${payload}`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
    headers: {
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      "X-RapidAPI-Key": "07b9594568mshd7bc234fdfe86e5p1339fdjsna37291750cfd",
    },
  };

  return axios.request(options).then((res) => res.data);
});

const coinSlice = createSlice({
  name: "coin",
  initialState: {
    loading: false,
    coin: null,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoin.fulfilled, (state, action) => {
      state.loading = false;
      state.coin = action.payload || null;
      state.error = "";
    });
    builder.addCase(fetchCoin.rejected, (state, action) => {
      state.loading = false;
      state.coin = null;
      state.error = action.error.message;
    });
  },
});

export default coinSlice.reducer;
