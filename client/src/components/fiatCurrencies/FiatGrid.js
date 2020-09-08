import React from 'react';
import { useSelector } from 'react-redux';
import { selectRatesDefault } from '../../features/search/searchSlice';
import {
  selectFiatCurrencies,
  selectRates,
  selectLoading,
} from '../../features/fiatCurrencies/fiatCurrenciesSlice';
import { selectMenu } from '../../features/menu/menuSlice';
import FiatCard from './FiatCard';
import Loader from '../utils/Loader';

const FiatGrid = () => {
  const fiatCurrencies = useSelector(selectFiatCurrencies);
  const rates = useSelector(selectRates);
  const ratesDefault = useSelector(selectRatesDefault);
  const loading = useSelector(selectLoading);
  const menuOpen = useSelector(selectMenu);

  if (loading) return <Loader />;

  return (
    <div className={`card-grid ${menuOpen ? ' justify-left' : ''}`}>
      {fiatCurrencies.map((fiat, index) => (
        <FiatCard
          key={index}
          fiat={fiat}
          rate={rates ? rates[fiat.ISO_code] || -1 : -1}
          rateDefault={ratesDefault ? ratesDefault[fiat.ISO_code] || -1 : -1}
        ></FiatCard>
      ))}
    </div>
  );
};

export default FiatGrid;
