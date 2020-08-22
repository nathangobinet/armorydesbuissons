import React from 'react';

import NewsList from './NewsList';
import Graph from './Graph';

export default function NewsGraphs() {
  return (
    <section className="py-2" id="news-graph">
      <div className="row">
        <NewsList />
        <Graph />
      </div>
    </section>
  );
}
