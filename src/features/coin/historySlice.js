import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoinHistory = createAsyncThunk(
  "coin/fetchCoinHistory",
  (payload) => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com/coin/${payload[0]}/history`,
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: payload[1],
      },
      headers: {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        "X-RapidAPI-Key": "07b9594568mshd7bc234fdfe86e5p1339fdjsna37291750cfd",
      },
    };

    return axios.request(options).then((res) => res.data);
  }
);

const historySlice = createSlice({
  name: "coinHistory",
  initialState: {
    loading: false,
    history: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoinHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoinHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = action.payload || null;
      state.error = "";
    });
    builder.addCase(fetchCoinHistory.rejected, (state, action) => {
      state.loading = false;
      state.history = null;
      state.error = action.error.message;
    });
  },
});

export default historySlice.reducer;
