import React, { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { selectFiatChart } from "../../features/fiatCurrency/fiatCurrencySlice";
import Chart from "chart.js";

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const isMobile = vw < 600;

const FiatChart = () => {
  const chart = useSelector(selectFiatChart);

  useEffect(() => {
    const ctx = document.getElementById("fiat-chart");
    if (chart === null) return;
    new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Price",
            yAxisID: "Price",
            backgroundColor: "#0099F7",
            borderColor: "#0099F7",
            // fill: false,
            data: chart && chart.data,
            pointRadius: 0,
            // lineTension: 0,
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
        legend: { position: "bottom", labels: { boxWidth: 12 } },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "series",
              offset: true,
              display: !isMobile,
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: "bold",
                },
                source: "data",
                autoSkip: true,
                autoSkipPadding: 70,
                maxRotation: 0,
                sampleSize: 10,
              },
              time: {
                parser: "MM/DD/YYYY",
                tooltipFormat: "ll",
              },
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
            },
          ],
          yAxes: [
            {
              id: "Price",
              display: !isMobile,
              gridLines: {
                drawBorder: false,
              },
              scaleLabel: {
                display: true,
                labelString: "Price ($)",
              },
              ticks: {
                callback: (value, index, values) => {
                  return value.toLocaleString();
                },
              },
            },
          ],
        },
        tooltips: {
          intersect: false,
          mode: "index",
          callbacks: {
            label: (tooltipItem, myData) => {
              let label = myData.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label += parseFloat(tooltipItem.value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 5,
              });
              return label;
            },
          },
          xPadding: 10,
          yPadding: 10,
          bodySpacing: 5,
          displayColors: false,
          titleFontSize: 13,
          bodyFontSize: 13,
        },
      },
    });
    // eslint-disable-next-line
  }, [chart]);

  return (
    <Fragment>
      <div className='chart'>
        <canvas id='fiat-chart'></canvas>
      </div>
      <div className='main-table'></div>
    </Fragment>
  );
};

export default FiatChart;
