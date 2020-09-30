import React from 'react';

import Ranking from './Ranking';
import Champions from './Champions';

export default function NewsGraphs() {
  return (
    <section className="py-2" id="ranking-champion">
      <div className="row">
        <Ranking />
        <Champions />
      </div>
    </section>
  );
}
