import React from 'react';

import Statistic from './Statistic';
import BestStats from './BestStats';

export default function Statistics() {
  return (
    <section className="py-2" id="stats">
      <div className="row">
        <BestStats />
        <Statistic />
      </div>
    </section>
  );
}
