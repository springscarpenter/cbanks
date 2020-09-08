import { createSlice } from '@reduxjs/toolkit';
import bankDB from '../../db/bankDB';

export const banksSlice = createSlice({
  name: 'banks',
  initialState: { bankList: [], loading: true },
  reducers: {
    fetchBankList: (state) => {
      state.bankList = [...state.bankList, ...bankDB];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { fetchBankList, setLoading } = banksSlice.actions;

export const selectBanks = (state) => state.banks.bankList;
export const selectLoading = (state) => state.banks.loading;

export default banksSlice.reducer;
