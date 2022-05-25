import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoins = createAsyncThunk("coin/fetchCoins", () => {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      "X-RapidAPI-Key": "07b9594568mshd7bc234fdfe86e5p1339fdjsna37291750cfd",
    },
  };
  return axios.request(options).then((res) => res.data);
});

const cryptoSlice = createSlice({
  name: "coins",
  initialState: {
    Loading: false,
    coins: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.Loading = false;
      state.coins = action.payload || [];
      state.error = "";
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.Loading = false;
      state.coins = [];
      state.error = action.error.message;
    });
  },
});

export default cryptoSlice.reducer;
