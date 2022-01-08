import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectStockChart } from '../../features/stock/stockSlice';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const isMobile = vw < 600;

const StockChart = () => {
  const chart = useSelector(selectStockChart);

  useEffect(() => {
    const ctx = document.getElementById('stock-chart');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Price',
            backgroundColor: '#0099F7',
            borderColor: '#0099F7',
            fill: true,
            data: chart && chart,
            pointRadius: 0,
            tension: 0.5,
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          xAxis: {
            type: 'timeseries',
            adapters: {
              date: {
                locale: enUS,
              },
            },
            offset: true,
            display: !isMobile,
            ticks: {
              major: {
                enabled: true,
                // fontStyle: 'bold',
              },
              source: 'data',
              autoSkip: true,
              autoSkipPadding: 70,
              maxRotation: 0,
              sampleSize: 10,
            },
            time: {
              parser: 'MM/dd/yyyy',
              tooltipFormat: 'PP',
            },
            title: { display: true, text: 'Date' },
          },

          yAxis: {
            display: !isMobile,
            grid: {
              drawBorder: false,
            },
            title: { display: true, text: 'Price ($)' },
            ticks: {
              callback: (value, index, values) => {
                return value.toLocaleString();
              },
            },
          },
        },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12 } },
          tooltip: {
            intersect: false,
            mode: 'index',
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += parseFloat(context.parsed.y).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                  }
                );
                return label;
              },
            },
            padding: 10,
            bodySpacing: 5,
            displayColors: false,
            titleFont: { size: 13 },
            bodyFont: { size: 13 },
          },
        },
      },
    });
    // eslint-disable-next-line
  }, [chart]);

  return (
    <Fragment>
      <div className='chart lg-chart'>
        <canvas id='stock-chart'></canvas>
      </div>
      <div className='main-table'></div>
    </Fragment>
  );
};

export default StockChart;
