import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCryptoChart,
  selectCryptoChartRange,
} from '../../features/cryptocurrency/cryptocurrencySlice';
import { selectTheme } from '../../features/theme/themeSlice';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const isMobile = vw < 600;

const CryptoChart = () => {
  const chart = useSelector(selectCryptoChart);
  const range = useSelector(selectCryptoChartRange);
  const darkMode = useSelector(selectTheme);
  const chartCanvas = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const newChartInstance = new Chart(chartCanvas.current, {
      data: {
        datasets: [
          {
            type: 'line',
            label: 'Price',
            yAxisID: 'Price',
            backgroundColor: '#0099F7',
            borderColor: '#0099F7',
            data: chart && chart.prices,
            pointRadius: 0,
            tension: 0,
            borderWidth: 1.5,
          },
          {
            type: darkMode ? 'line' : 'bar',
            label: 'Volume',
            yAxisID: 'Volume',
            backgroundColor: '#2fcbaf',
            borderColor: '#2fcbaf',
            data: chart && chart.total_volumes,
            pointRadius: 0,
            tension: 0,
            borderWidth: 1,
            barThickness: 'flex',
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
          Price: {
            display: !isMobile,
            grid: {
              drawBorder: false,
            },
            title: { display: true, text: 'Price ($)' },
            position: 'left',
            ticks: {
              callback: (value, index, values) => {
                return value.toLocaleString();
              },
            },
          },
          Volume: {
            display: !isMobile,
            title: { display: true, text: 'Volume ($)' },
            position: 'right',
            ticks: {
              callback: (value, index, values) => {
                return value.toExponential();
              },
            },
            grid: { display: false },
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
    setChartInstance(newChartInstance);
    //eslint-disable-next-line
  }, [chartCanvas]);

  useEffect(() => {
    if (chart && chartInstance) {
      chartInstance.data.datasets[0].data = chart.prices;
      chartInstance.data.datasets[1].data = chart.total_volumes;
      chartInstance.options.scales.xAxis.time.tooltipFormat =
        range === '1' ? 'PPp' : 'PP';
      chartInstance.options.scales.xAxis.title.text =
        range === '1' ? 'Time' : 'Date';
      chartInstance.update();
    }
    //eslint-disable-next-line
  }, [chart]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.data.datasets[1].type = darkMode ? 'line' : 'bar';
      chartInstance.update();
    }
    //eslint-disable-next-line
  }, [darkMode]);

  return (
    <div className='chart'>
      <canvas ref={chartCanvas}></canvas>
    </div>
  );
};

export default CryptoChart;
