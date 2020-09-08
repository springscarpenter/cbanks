import React from 'react';
import { useSelector } from 'react-redux';
import { selectBanks, selectLoading } from '../../features/banks/banksSlice';
import { selectMenu } from '../../features/menu/menuSlice';
import BankCard from './BankCard';
import Loader from '../utils/Loader';

const BankGrid = () => {
  const banks = useSelector(selectBanks);
  const loading = useSelector(selectLoading);
  const menuOpen = useSelector(selectMenu);

  if (loading) return <Loader />;

  return (
    <div className={`card-grid ${menuOpen ? ' justify-left' : ''}`}>
      {banks.map((bank, index) => (
        <BankCard key={index} bank={bank} />
      ))}
    </div>
  );
};

export default BankGrid;
