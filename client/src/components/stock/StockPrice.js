import React from "react";
import { useSelector } from "react-redux";
import { selectStockQuote } from "../../features/stock/stockSlice";

const StockPrice = () => {
  const quote = useSelector(selectStockQuote);
  const percentangeChange = ((quote.c - quote.pc) * 100) / quote.pc || null;

  return (
    <div className='current-price'>
      <span>
        $
        {quote.c
          ? quote.c.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "?"}
      </span>
      <span
        style={{
          color: percentangeChange > 0 ? "green" : "red",
        }}
      >
        {percentangeChange
          ? percentangeChange.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "?"}
        %
      </span>
    </div>
  );
};

export default StockPrice;
