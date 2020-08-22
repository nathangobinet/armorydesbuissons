import React, { useState } from 'react';

const playerState = {
  displayed: null,
  setDisplayed: null,
  setPlayerData: null,
};

function PlayerPopper() {
  const [displayed, setDisplayed] = useState(false);
  const [playerData, setPlayerData] = useState({});

  playerState.displayed = displayed;
  playerState.setDisplayed = setDisplayed;
  playerState.setPlayerData = setPlayerData;

  return (
    <div id="player-info-popper" style={{ margin: 0, visibility: (displayed) ? 'visible' : 'hidden', opacity: (displayed) ? 1 : 0 }}>
      <div className="card shadow bg-info-popper">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="text-accent hide-overflow mb-0">{playerData.name}</h4>
          <a href="/">View profile</a>
        </div>
        <div className="row mb-4">
          <div className="col-sm-6 pb-3 pb-xl-0 px-xl-5">
            <h5>Current division</h5>
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-primary"><i className="fas fa-medal fa-3x" /></div>
              <div>
                <div className="text-accent"><b>TOP10</b></div>
                <div>1251 points</div>
                <div><small>Top 0.5%</small></div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 px-xl-5">
            <h5>Previously</h5>
            <div className="d-flex justify-content-between">
              <span>Season 24</span>
              <span className="text-accent">DIAMOND</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Season 23</span>
              <span className="text-accent">GOLD</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Season 22</span>
              <span className="text-accent">UNRANKED</span>
            </div>
          </div>
        </div>
        <h5>Current division</h5>
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-borderless table-striped table-sm">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">Today</th>
                <th scope="col">This month</th>
                <th scope="col">All time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Kills</th>
                <td>100</td>
                <td>1000</td>
                <td>10000</td>
              </tr>
              <tr>
                <th scope="row">Deaths</th>
                <td>50</td>
                <td>500</td>
                <td>5000</td>
              </tr>
              <tr>
                <th scope="row">Ratio</th>
                <td>2</td>
                <td>2</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { playerState, PlayerPopper };
