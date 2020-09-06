import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBanks,
  fetchBankList,
  setLoading,
} from '../features/banks/banksSlice';
import BankGrid from '../components/banks/BankGrid';

const CentralBanks = () => {
  const banks = useSelector(selectBanks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (banks.length === 0) dispatch(fetchBankList());
    dispatch(setLoading(false));
    //eslint-disable-next-line
  }, []);

  return <BankGrid />;
};

export default CentralBanks;
