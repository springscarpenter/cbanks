import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExchanges,
  fetchExchanges,
} from '../features/exchanges/exchangesSlice';
import { selectView } from '../features/view/viewSlice';
import ExchangeGrid from '../components/exchanges/ExchangeGrid';
import ExchangeTable from '../components/exchanges/ExchangeTable';

const Exchanges = () => {
  const exchanges = useSelector(selectExchanges);
  const gridView = useSelector(selectView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (exchanges.length === 0) dispatch(fetchExchanges(1));
    //eslint-disable-next-line
  }, []);

  return gridView ? <ExchangeGrid /> : <ExchangeTable />;
};

export default Exchanges;
