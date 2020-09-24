import React from 'react';
import Graph from './Graph';
import ResetScore from './ResetScore';

export default function ResetGraph({ profileInfo }) {
  if (!profileInfo || !profileInfo.isItsProfile) return '';
  return (
    <section id="reset-graph" className="mt-4">
      <div className="row">
        <div className="col-xl-4">
          <ResetScore profileInfo={profileInfo} />
        </div>
        <div className="col-xl-8">
          <Graph profileInfo={profileInfo} />
        </div>
      </div>
    </section>
  );
}
