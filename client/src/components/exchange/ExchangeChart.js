import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectExchangeChart,
  selectExchangeChartRange,
} from '../../features/exchange/exchangeSlice';
import Chart from 'chart.js';

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
            // fill: false,
            data: chart,
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
        legend: { position: 'bottom', labels: { boxWidth: 12 } },
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'series',
              offset: true,
              display: !isMobile,
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: 'bold',
                },
                source: 'data',
                autoSkip: true,
                autoSkipPadding: 70,
                maxRotation: 0,
                sampleSize: 10,
              },
              time: {
                parser: 'MM/DD/YYYY',
                tooltipFormat: 'll',
              },
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
            },
          ],
          yAxes: [
            {
              display: !isMobile,
              gridLines: {
                drawBorder: false,
              },
              scaleLabel: {
                display: true,
                labelString: 'Volume (BTC)',
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
          mode: 'index',
          callbacks: {
            label: (tooltipItem, myData) => {
              let label = myData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += parseFloat(tooltipItem.value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
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
    setChartInstance(newChartInstance);
    // eslint-disable-next-line
  }, [chartCanvas]);

  useEffect(() => {
    if (chart && chartInstance) {
      chartInstance.data.datasets[0].data = chart;
      chartInstance.options.scales.xAxes[0].time.tooltipFormat =
        range === '1' ? 'lll' : 'll';
      chartInstance.options.scales.xAxes[0].scaleLabel.labelString =
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
