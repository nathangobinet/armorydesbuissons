import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { isDarkMode } from '../../Helpers/theme';

const PERIODS = {
  DAY: 'day',
  SEASON: 'season',
};

function createGraph(graphRef, t) {
  const lineChartData = {
    labels: ['02/04', '03/04', '04/04', '05/04', '06/04', '07/04', '08/04'],
    datasets: [{
      label: t('live.graph.kills'),
      borderColor: '#63BF60',
      backgroundColor: '#63BF60',
      fill: false,
      data: [10, 5, 56, 12, 54, 10, 10],
      yAxisID: 'y-axis-1',
    }, {
      label: t('live.graph.players'),
      borderColor: '#F26E50',
      backgroundColor: '#F26E50',
      fill: false,
      data: [21, 12, 21, 12, 21, 21, 54],
      yAxisID: 'y-axis-2',
    }],
  };
  Chart.defaults.global.defaultFontColor = isDarkMode() ? '#ddd' : '#666';
  const gridColor = isDarkMode() ? '#666' : '#ccc';
  return new Chart(graphRef.current, {
    type: 'line',
    data: lineChartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
      },
      scales: {
        xAxes: [{ gridLines: { color: gridColor } }],
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: { color: gridColor },
        }, {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
            gridLines: { color: gridColor },
          },
        }],
      },
    },
  });
}

export default function Graph() {
  const graphRef = useRef();
  const [period, setPeriod] = useState(PERIODS.DAY);
  const { t } = useTranslation('common');

  useEffect(() => {
    createGraph(graphRef, t);
  }, [t]);

  return (
    <div className="col-xl-7 py-2">
      <div className="card shadow h-100">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="text-accent mb-0">{t('live.graph.title')}</h4>
          <div className="nav-pills pills-accent d-flex flex-column flex-sm-row align-items-center justify-content-between">
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${((period) === PERIODS.DAY) ? 'active' : ''}`}
              onClick={() => { setPeriod(PERIODS.DAY); }}
              onKeyPress={() => { setPeriod(PERIODS.DAY); }}
            >
              {t('live.graph.day')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${((period) === PERIODS.SEASON) ? 'active' : ''}`}
              onClick={() => { setPeriod(PERIODS.SEASON); }}
              onKeyPress={() => { setPeriod(PERIODS.SEASON); }}
            >
              {t('live.graph.season')}
            </span>
          </div>
        </div>
        <div className="chart-container">
          <canvas ref={graphRef} />
        </div>
      </div>
    </div>
  );
}
