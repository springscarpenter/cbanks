import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCryptocurrencies,
  fetchCryptocurrencies,
} from '../features/cryptocurrencies/cryptocurrenciesSlice';
import { selectView } from '../features/view/viewSlice';
import CryptoGrid from '../components/cryptocurrencies/CryptoGrid';
import CryptoTable from '../components/cryptocurrencies/CryptoTable';

const Cryptocurrencies = () => {
  const cryptocurrencies = useSelector(selectCryptocurrencies);
  const gridView = useSelector(selectView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cryptocurrencies.length === 0) dispatch(fetchCryptocurrencies(1));
    //eslint-disable-next-line
  }, []);

  return gridView ? <CryptoGrid /> : <CryptoTable />;
};

export default Cryptocurrencies;
