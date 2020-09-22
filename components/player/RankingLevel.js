import React from 'react';
import Level from './Level';
import Ranking from './Ranking';

export default function RankingLevel({ profileInfo }) {
  return (
    <section id="ranking-level" className="mt-3">
      <div className="row">
        <div className="col-xl-8">
          <Ranking profileInfo={profileInfo} />
        </div>
        <div className="col-xl-4">
          <Level profileInfo={profileInfo} />
        </div>
      </div>
    </section>
  );
}
