import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCryptocurrencies,
  selectHasMore,
  selectLoading,
  fetchCryptocurrencies,
} from '../../features/cryptocurrencies/cryptocurrenciesSlice';
import { selectMenu } from '../../features/menu/menuSlice';
import { Waypoint } from 'react-waypoint';
import CryptoCard from './CryptoCard';
import Loader from '../utils/Loader';

const CryptoGrid = () => {
  const cryptocurrencies = useSelector(selectCryptocurrencies);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);
  const menuOpen = useSelector(selectMenu);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  return (
    <div style={{ width: '100%' }}>
      <div className={`card-grid ${menuOpen ? ' justify-left' : ''}`}>
        {cryptocurrencies.map((crypto, index) => (
          <Fragment key={index}>
            <CryptoCard key={index} crypto={crypto}></CryptoCard>
            {hasMore && index === cryptocurrencies.length - 50 ? (
              <Waypoint
                onEnter={() => {
                  dispatch(fetchCryptocurrencies(page + 1));
                  setPage(page + 1);
                }}
              />
            ) : undefined}
          </Fragment>
        ))}
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default CryptoGrid;
