import 'bootstrap';
import { createPopper } from '@popperjs/core';
import Aos from 'aos';
import Chart from 'chart.js';
import './nav/toggleNav';
import './nav/toggleNavSelects';

Aos.init({
  offset: 120,
  delay: 100,
  duration: 600,
  disable: 'mobile',
});


const lineChartData = {
  labels: ['02/04', '03/04', '04/04', '05/04', '06/04', '07/04', '08/04'],
  datasets: [{
    label: 'Kills',
    borderColor: '#63BF60',
    backgroundColor: '#63BF60',
    fill: false,
    data: [
      10,
      5,
      56,
      12,
      54,
      10,
      10,
    ],
    yAxisID: 'y-axis-1',
  }, {
    label: 'Players',
    borderColor: '#F26E50',
    backgroundColor: '#F26E50',
    fill: false,
    data: [
      21,
      12,
      21,
      12,
      21,
      21,
      54,
    ],
    yAxisID: 'y-axis-2',
  }],
};


const ctx = document.getElementById('canvas');
// eslint-disable-next-line no-unused-vars
const chart = new Chart(ctx, {
  type: 'line',
  data: lineChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    scales: {
      yAxes: [{
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'left',
        id: 'y-axis-1',
      }, {
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'right',
        id: 'y-axis-2',

        // grid line settings
        gridLines: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      }],
    },
  },
});

const tooltip = document.querySelector('#player-info-popper');
let popperInstance = null;

function create(target) {
  popperInstance = createPopper(target, tooltip, {
    placement: (window.innerWidth) > 1100 ? 'right' : 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });
}

function destroy() {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

function hide(event) {
  if (!event.path.includes(tooltip)) {
    document.removeEventListener('click', hide);
    tooltip.removeAttribute('data-show');
    destroy();
  }
}

function show(target) {
  document.addEventListener('click', hide);
  tooltip.setAttribute('data-show', '');
  create(target);
}


const playerElements = document.getElementsByClassName('link');
Array.prototype.forEach.call(playerElements, (el) => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    show(e.currentTarget);
  });
});
