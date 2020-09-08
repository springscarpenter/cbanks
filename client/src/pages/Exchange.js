import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExchangeProfile,
  selectLoading,
  fetchExchangeProfile,
  fetchExchangeChart,
  fetchExchangeTickers,
  resetDetails,
  setLoading,
} from '../features/exchange/exchangeSlice';
import ExchangeProfile from '../components/exchange/ExchangeProfile';
import ExchangeMarketData from '../components/exchange/ExchangeMarketData';
import Loader from '../components/utils/Loader';
import PropTypes from 'prop-types';

const Exchange = ({ match }) => {
  const profile = useSelector(selectExchangeProfile);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetDetails());
    dispatch(setLoading(true));
    dispatch(fetchExchangeProfile(match.params.id));
    dispatch(fetchExchangeChart(match.params.id, '14'));
    dispatch(fetchExchangeTickers(match.params.id));
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  if (profile === null) return <div>Not Found</div>;

  return (
    <div className='main-content-container'>
      <div className='details'>
        <ExchangeProfile />
        <ExchangeMarketData exchange_id={match.params.id} />
      </div>
    </div>
  );
};

Exchange.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Exchange;
