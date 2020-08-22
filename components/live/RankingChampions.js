import React from 'react';

import Ranking from './Ranking';
import Champions from './Champions';

export default function NewsGraphs() {
  return (
    <section className="py-2" id="news-graph">
      <div className="row">
        <Ranking />
        <Champions />
      </div>
    </section>
  );
}
