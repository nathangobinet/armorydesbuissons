import React from 'react';

import OnlinePlayers from './OnlinePlayers';
import LastKils from './LastKills';

function LiveInfo() {
  return (
    <section className="py-2" id="live-info">
      <div className="row">
        <OnlinePlayers />
        <LastKils />
      </div>
    </section>
  );
}

export default LiveInfo;
