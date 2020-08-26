import React from 'react';

import OnlinePlayers from './OnlinePlayers';
import LastKils from './LastKills';

function LiveInfo({ socket }) {
  return (
    <section className="py-2" id="live-info">
      <div className="row">
        <OnlinePlayers socket={socket} />
        <LastKils socket={socket} />
      </div>
    </section>
  );
}

export default LiveInfo;
