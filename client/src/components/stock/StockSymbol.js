import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStockSymbol,
  fetchStockData,
} from "../../features/stock/stockSlice";

const StockSymbol = () => {
  const defaultSymbol = useSelector(selectStockSymbol);
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState(defaultSymbol);
  const onKeyUp = (e) => {
    if (symbol && e.key === "Enter") dispatch(fetchStockData(symbol));
  };

  return (
    <div className='stock-symbol'>
      <input
        type='text'
        className='stock-input'
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        onKeyUp={onKeyUp}
      />
      <div>
        <a
          href={`https://finance.yahoo.com/quote/${symbol}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Yahoo Finance
        </a>
      </div>
    </div>
  );
};

export default StockSymbol;
