import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExchanges,
  selectHasMore,
  selectLoading,
  fetchExchanges,
} from '../../features/exchanges/exchangesSlice';
import { selectMenu } from '../../features/menu/menuSlice';
import { Waypoint } from 'react-waypoint';
import ExchangeCard from './ExchangeCard';

const ExchangeGrid = () => {
  const exchanges = useSelector(selectExchanges);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);
  const menuOpen = useSelector(selectMenu);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  return (
    <div style={{ width: '100%' }}>
      <div className={`card-grid ${menuOpen ? ' justify-left' : ''}`}>
        {exchanges.map((exchange, index) => (
          <Fragment key={index}>
            <ExchangeCard key={index} exchange={exchange}></ExchangeCard>
            {hasMore && index === exchanges.length - 50 ? (
              <Waypoint
                onEnter={() => {
                  dispatch(fetchExchanges(page + 1));
                  setPage(page + 1);
                }}
              />
            ) : undefined}
          </Fragment>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default ExchangeGrid;
