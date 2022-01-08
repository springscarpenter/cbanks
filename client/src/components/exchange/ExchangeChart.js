import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectExchangeChart,
  selectExchangeChartRange,
} from '../../features/exchange/exchangeSlice';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const isMobile = vw < 600;

const ExchangeChart = () => {
  const chart = useSelector(selectExchangeChart);
  const range = useSelector(selectExchangeChartRange);
  const chartCanvas = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const newChartInstance = new Chart(chartCanvas.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Volume',
            backgroundColor: '#0099F7',
            borderColor: '#0099F7',
            fill: true,
            data: chart,
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
            title: { display: true, text: 'Volume (BTC)' },
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
                    maximumFractionDigits: 2,
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
    setChartInstance(newChartInstance);
    // eslint-disable-next-line
  }, [chartCanvas]);

  useEffect(() => {
    if (chart && chartInstance) {
      chartInstance.data.datasets[0].data = chart;
      chartInstance.options.scales.xAxis.time.tooltipFormat =
        range === '1' ? 'PPp' : 'PP';
      chartInstance.options.scales.xAxis.title.text =
        range === '1' ? 'Time' : 'Date';
      chartInstance.update();
    }
    //eslint-disable-next-line
  }, [chart]);

  return (
    <div className='chart'>
      <canvas ref={chartCanvas}></canvas>
    </div>
  );
};

export default ExchangeChart;
