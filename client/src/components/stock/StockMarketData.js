import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectStockQuote } from "../../features/stock/stockSlice";
import StockSymbol from "./StockSymbol";
import StockPrice from "./StockPrice";
import StockMarketOverview from "./StockMarketOverview";
import StockChart from "./StockChart";
import NotFound from "../utils/NotFound";

const StockMarketData = () => {
  const quote = useSelector(selectStockQuote);

  return (
    <div className='market-data stock-data'>
      <StockSymbol />
      {quote && !quote.error && Object.keys(quote).length !== 0 ? (
        <Fragment>
          <StockPrice />
          <StockMarketOverview />
          <StockChart />
        </Fragment>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default StockMarketData;
