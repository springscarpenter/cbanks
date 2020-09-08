import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCryptocurrencies,
  fetchCryptocurrencies,
} from '../features/cryptocurrencies/cryptocurrenciesSlice';
import CryptoGrid from '../components/cryptocurrencies/CryptoGrid';

const Cryptocurrencies = () => {
  const cryptocurrencies = useSelector(selectCryptocurrencies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cryptocurrencies.length === 0) dispatch(fetchCryptocurrencies(1));
    //eslint-disable-next-line
  }, []);

  return <CryptoGrid />;
};

export default Cryptocurrencies;
