import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFiatCurrencies,
  fetchFiatCurrencies,
} from '../features/fiatCurrencies/fiatCurrenciesSlice';
import { selectView } from '../features/view/viewSlice';
import FiatGrid from '../components/fiatCurrencies/FiatGrid';
import FiatTable from '../components/fiatCurrencies/FiatTable';

const FiatCurrencies = () => {
  const fiatCurrencies = useSelector(selectFiatCurrencies);
  const gridView = useSelector(selectView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fiatCurrencies.length === 0) dispatch(fetchFiatCurrencies());
    //eslint-disable-next-line
  }, []);

  return gridView ? <FiatGrid /> : <FiatTable />;
};

export default FiatCurrencies;
