import React from "react";
import { useSelector } from "react-redux";
import { selectStockQuote } from "../../features/stock/stockSlice";

const StockMarketOverview = () => {
  const quote = useSelector(selectStockQuote);

  return (
    <div className='market-overview'>
      <div>
        <span>Previous Close</span>
        <span>
          $
          {quote.pc
            ? quote.pc.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
        </span>
      </div>
      <div>
        <span>Open</span>
        <span>
          $
          {quote.o
            ? quote.o.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
        </span>
      </div>
      <div>
        <span>24h Low / High</span>
        <span>
          $
          {quote.l
            ? quote.l.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}{" "}
          / $
          {quote.h
            ? quote.h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
        </span>
      </div>
    </div>
  );
};

export default StockMarketOverview;
