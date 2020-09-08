import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBanks,
  fetchBankList,
  setLoading,
} from '../features/banks/banksSlice';
import { selectView } from '../features/view/viewSlice';
import BankGrid from '../components/banks/BankGrid';
import BankTable from '../components/banks/BankTable';

const CentralBanks = () => {
  const banks = useSelector(selectBanks);
  const gridView = useSelector(selectView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (banks.length === 0) dispatch(fetchBankList());
    dispatch(setLoading(false));
    //eslint-disable-next-line
  }, []);

  return gridView ? <BankGrid /> : <BankTable />;
};

export default CentralBanks;
