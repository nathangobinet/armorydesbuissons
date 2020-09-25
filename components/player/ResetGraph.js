import React from 'react';
import Graph from './Graph';
import ResetScore from './ResetScore';

export default function ResetGraph({ profileInfo }) {
  return (
    <section id="reset-graph">
      <div className="row">
        <div className="col-xl-4 mt-4">
          <ResetScore profileInfo={profileInfo} />
        </div>
        <div className="col-xl-8 mt-4">
          <Graph profileInfo={profileInfo} />
        </div>
      </div>
    </section>
  );
}
