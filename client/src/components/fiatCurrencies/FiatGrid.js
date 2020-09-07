import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectFiatCurrencies,
  selectRates,
  selectLoading,
} from '../../features/fiatCurrencies/fiatCurrenciesSlice';
import { selectMenu } from '../../features/menu/menuSlice';
import FiatCard from './FiatCard';

const FiatGrid = () => {
  const fiatCurrencies = useSelector(selectFiatCurrencies);
  const rates = useSelector(selectRates);
  const loading = useSelector(selectLoading);
  const menuOpen = useSelector(selectMenu);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`card-grid ${menuOpen && 'justify-left'}`}>
      {fiatCurrencies.map((fiat, index) => (
        <FiatCard
          key={index}
          fiat={fiat}
          rate={rates ? rates[fiat.ISO_code] || -1 : -1}
        ></FiatCard>
      ))}
    </div>
  );
};

export default FiatGrid;
