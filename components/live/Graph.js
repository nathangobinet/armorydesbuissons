/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import useTranslation from 'next-translate/useTranslation';
import { isDarkMode } from '../../helpers/theme';

import styles from '../../styles/Live.module.css';
import useFetch from '../../helpers/useFetch';

const PERIODS = {
  DAY: 'day',
  SEASON: 'season',
};

function getHistoryData(period, history) {
  const labels = (period === PERIODS.DAY)
    ? history.players.map((p) => `${p.hour}h`)
    : history.players.map((p) => (new Date(p.date)).toLocaleDateString());

  const data1 = history.kills.map((k) => k.nbKills);
  const data2 = history.players.map((p) => p.nbPlayers);
  return { labels, data1, data2 };
}

function createGraph(graphRef, t, data) {
  const { labels, data1, data2 } = data;
  const lineChartData = {
    labels,
    datasets: [{
      label: t('common:live.graph.kills'),
      borderColor: '#63BF60',
      backgroundColor: '#63BF60',
      fill: false,
      data: data1,
      yAxisID: 'y-axis-1',
    }, {
      label: t('common:live.graph.players'),
      borderColor: '#F26E50',
      backgroundColor: '#F26E50',
      fill: false,
      data: data2,
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

function updateChart(chart, data) {
  const { labels, data1, data2 } = data;
  chart.data.labels = labels;
  chart.data.datasets[0].data = data1;
  chart.data.datasets[1].data = data2;
  chart.update();
}

let chart;

export default function Graph() {
  const graphRef = useRef();
  const [period, setPeriod] = useState(PERIODS.DAY);
  const history = useFetch('/api/history', { players: [], kills: [] }, { period });
  const { t } = useTranslation();

  useEffect(() => {
    chart = undefined;
  }, []);

  useEffect(() => {
    const data = getHistoryData(period, history);
    if (!chart) chart = createGraph(graphRef, t, data);
    else updateChart(chart, data);
  }, [history]);

  return (
    <div className="col-xl-7 py-2">
      <div className="card shadow h-100">
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
          <h4 className="text-accent mb-0">{t('common:live.graph.title')}</h4>
          <div className="nav-pills pills-accent d-flex flex-row align-items-center justify-content-between py-sm-0 py-3">
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${((period) === PERIODS.DAY) ? 'active' : ''}`}
              onClick={() => { setPeriod(PERIODS.DAY); }}
              onKeyPress={() => { setPeriod(PERIODS.DAY); }}
            >
              {t('common:live.graph.day')}
            </span>
            <span
              role="button"
              tabIndex="0"
              className={`nav-link ${((period) === PERIODS.SEASON) ? 'active' : ''}`}
              onClick={() => { setPeriod(PERIODS.SEASON); }}
              onKeyPress={() => { setPeriod(PERIODS.SEASON); }}
            >
              {t('common:live.graph.season')}
            </span>
          </div>
        </div>
        <div className={styles['chart-container']}>
          <canvas ref={graphRef} />
        </div>
      </div>
    </div>
  );
}
