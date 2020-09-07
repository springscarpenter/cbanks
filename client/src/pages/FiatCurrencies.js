import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFiatCurrencies,
  fetchFiatCurrencies,
} from '../features/fiatCurrencies/fiatCurrenciesSlice';
import FiatGrid from '../components/fiatCurrencies/FiatGrid';

const FiatCurrencies = () => {
  const fiatCurrencies = useSelector(selectFiatCurrencies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fiatCurrencies.length === 0) dispatch(fetchFiatCurrencies());
    //eslint-disable-next-line
  }, []);

  return <FiatGrid />;
};

export default FiatCurrencies;
