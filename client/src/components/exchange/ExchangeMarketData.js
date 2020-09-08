import React from "react";
import PropTypes from "prop-types";
import ExchangeVolume from "./ExchangeVolume";
import ExchangeChartButtons from "./ExchangeChartButtons";
import ExchangeChart from "./ExchangeChart";
import ExchangeTickers from "./ExchangeTickers";

const ExchangeMarketData = ({ exchange_id }) => {
  return (
    <div className='market-data'>
      <ExchangeVolume />
      <ExchangeChartButtons />
      <ExchangeChart />
      <ExchangeTickers exchange_id={exchange_id} />
    </div>
  );
};

ExchangeMarketData.propTypes = {
  exchange_id: PropTypes.string,
};

export default ExchangeMarketData;
