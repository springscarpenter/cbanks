import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExchanges,
  fetchExchanges,
} from '../features/exchanges/exchangesSlice';
import ExchangeGrid from '../components/exchanges/ExchangeGrid';

const Exchanges = () => {
  const exchanges = useSelector(selectExchanges);
  const dispatch = useDispatch();

  useEffect(() => {
    if (exchanges.length === 0) dispatch(fetchExchanges(1));
    //eslint-disable-next-line
  }, []);

  return <ExchangeGrid />;
};

export default Exchanges;
