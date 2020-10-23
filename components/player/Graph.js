import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import useTranslation from 'next-translate/useTranslation';

import Lock from './Lock';
import { isDarkMode } from '../../helpers/theme';
import styles from '../../styles/Player.module.css';

function createGraph(graphRef, t, data) {
  const {
    labels, data1, data2, data3,
  } = data;
  const lineChartData = {
    labels,
    datasets: [{
      label: t('player:graph.kills'),
      borderColor: '#63BF60',
      backgroundColor: '#63BF60',
      fill: false,
      data: data1,
      yAxisID: 'y-axis-1',
    }, {
      label: t('player:graph.deaths'),
      borderColor: '#F26E50',
      backgroundColor: '#F26E50',
      fill: false,
      data: data2,
      yAxisID: 'y-axis-1',
    }, {
      label: t('player:graph.ratio'),
      borderColor: '#aaa',
      backgroundColor: isDarkMode() ? '#555' : '#ccc',
      fill: false,
      type: 'bar',
      data: data3,
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
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          gridLines: { color: gridColor },
        }, {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
            gridLines: { color: gridColor },
          },
        }],
      },
    },
  });
}

function getData(killsHistory) {
  const orderedKillsHistory = killsHistory.reverse();
  const labels = orderedKillsHistory.map((k) => (new Date(k.date)).toLocaleDateString());
  const data1 = orderedKillsHistory.map((k) => k.nbKills);
  const data2 = orderedKillsHistory.map((k) => k.nbDeaths);
  const data3 = orderedKillsHistory.map(
    (k) => ((k.nbDeaths === 0) ? k.nbKills : (k.nbKills / k.nbDeaths).toFixed(2)),
  );
  return {
    labels, data1, data2, data3,
  };
}

export default function Graph({ profileInfo }) {
  const { t } = useTranslation();
  const graphRef = useRef();
  useEffect(() => {
    const data = getData(profileInfo.killsHistory);
    createGraph(graphRef, t, data);
  }, []);

  return (
    <div className="card bt-accent shadow h-100 mt-xl-0">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3>{t('player:graph.title')}</h3>
        <Lock id="graph" />
      </div>
      <div className={styles['chart-container']}>
        <canvas ref={graphRef} />
      </div>
    </div>
  );
}
