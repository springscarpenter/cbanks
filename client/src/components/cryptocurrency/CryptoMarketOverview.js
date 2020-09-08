import React from "react";
import { useSelector } from "react-redux";
import { selectCryptoProfile } from "../../features/cryptocurrency/cryptocurrencySlice";
import supplyDB from "../../db/supplyDB";

const CryptoMarketOverview = () => {
  const {
    symbol,
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
    market_cap,
    total_volume,
    high_24h,
    low_24h,
    price_change_percentage_24h,
    price_change_percentage_7d,
    circulating_supply,
    current_price,
    id,
  } = useSelector(selectCryptoProfile);

  return (
    <div className='market-overview'>
      <div>
        <span>Market Cap</span>
        <span>
          $
          {supplyDB[id]
            ? (supplyDB[id] * current_price).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })
            : market_cap
            ? market_cap.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })
            : "?"}
        </span>
      </div>
      <div>
        <span>24h Volume</span>
        <span>
          $
          {total_volume && price_change_percentage_24h
            ? total_volume.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })
            : "?"}
        </span>
      </div>
      <div>
        <span>24h Low / High</span>
        <span>
          $
          {low_24h
            ? low_24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}{" "}
          / $
          {high_24h
            ? high_24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
        </span>
      </div>
      <div>
        <span>Circulating Supply</span>
        <span>
          {supplyDB[id]
            ? supplyDB[id].toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })
            : circulating_supply
            ? circulating_supply.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })
            : "?"}{" "}
          {symbol && symbol.toUpperCase()}
        </span>
      </div>
      <div>
        <span>24h Change</span>
        <span
          style={{
            color: price_change_percentage_24h > 0 ? "green" : "red",
          }}
        >
          {price_change_percentage_24h
            ? price_change_percentage_24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
          %
        </span>
      </div>
      <div>
        <span>7d Change</span>
        <span
          style={{
            color: price_change_percentage_7d > 0 ? "green" : "red",
          }}
        >
          {price_change_percentage_7d
            ? price_change_percentage_7d.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
          %
        </span>
      </div>
      <div>
        <span>All Time High</span>
        <span>
          $
          {ath
            ? ath.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
        </span>
        <span
          style={{
            color: ath_change_percentage > 0 ? "green" : "red",
          }}
        >
          {ath_change_percentage
            ? ath_change_percentage.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
          %
        </span>
        {ath_date && <small>{new Date(ath_date).toDateString()}</small>}
      </div>
      <div>
        <span>All Time Low</span>
        <span>
          $
          {atl
            ? atl.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
        </span>
        <span
          style={{
            color: atl_change_percentage > 0 ? "green" : "red",
          }}
        >
          {atl_change_percentage
            ? atl_change_percentage.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "?"}
          %
        </span>
        {atl_date && <small>{new Date(atl_date).toDateString()}</small>}
      </div>
    </div>
  );
};

export default CryptoMarketOverview;
