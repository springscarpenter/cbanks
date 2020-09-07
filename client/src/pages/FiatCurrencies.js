import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFiatCurrencies,
  fetchFiatCurrencies,
} from '../features/fiatCurrencies/fiatCurrenciesSlice';
import FiatGrid from '../components/fiatCurrencies/FiatGrid';

const FiatCurrencies = () => {
  const fiatCurrencies = useSelector(selectFiatCurrencies);
  const dispatch = useDispatch();

  if (fiatCurrencies.length === 0) dispatch(fetchFiatCurrencies());

  return <FiatGrid />;
};

export default FiatCurrencies;
