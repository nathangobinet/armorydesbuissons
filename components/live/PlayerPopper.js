/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import useTranslation from 'next-translate/useTranslation';
import styles from '../../styles/Live.module.css';
import useFetch from '../../helpers/useFetch';

const playerState = {
  displayed: null,
  setDisplayed: null,
  setPlayerData: null,
};

function PlayerPopper() {
  const [displayed, setDisplayed] = useState(false);
  const [playerData, setPlayerData] = useState({});
  const playerResume = useFetch('/api/playerResume', undefined, { id: playerData.id });

  const { t } = useTranslation('common');

  playerState.displayed = displayed;
  playerState.setDisplayed = setDisplayed;
  playerState.setPlayerData = setPlayerData;

  return (
    <div id="player-info-popper" className={styles['player-info-popper']} style={{ margin: 0, visibility: (displayed) ? 'visible' : 'hidden', opacity: (displayed) ? 1 : 0 }}>
      <div className="card bg-info-popper">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="text-accent hide-overflow mb-0">{playerData.name}</h4>
          <a href="/">{t('live.popper.profile')}</a>
        </div>
        <div className="row mb-4">
          <div className="col-sm-6 pb-3 pb-xl-0 px-xl-5">
            <h5>{t('live.popper.division')}</h5>
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-primary"><i className="fas fa-medal fa-3x" /></div>
              <div>
                {(playerResume && playerResume.ranks.current)
                  ? (
                    <div>
                      <div className="text-accent"><b>{ playerResume ? playerResume.ranks.current.division : '' }</b></div>
                      <div>
                        { playerResume ? Math.round(playerResume.ranks.current.score) : '' }
                        {' '}
                        points
                      </div>
                      <div>
                        <small>
                          №
                          {' '}
                          { playerResume ? playerResume.ranks.current.rank : '' }
                        </small>
                      </div>
                    </div>
                  ) : <div className="text-accent"><b>{t('live.popper.unranked')}</b></div>}
              </div>
            </div>
          </div>
          <div className="col-sm-6 px-xl-5">
            <h5>{t('live.popper.previously')}</h5>
            {
              playerResume ? playerResume.ranks.passed.map((rank) => (
                <div key={rank.season} className="d-flex justify-content-between">
                  <span>{rank.season}</span>
                  <span className="text-accent">
                    { (rank.ligue) ? rank.ligue : t('live.popper.unranked')}
                  </span>
                </div>
              )) : ''
            }
          </div>
        </div>
        <h5>{t('live.popper.stats')}</h5>
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-borderless table-striped table-sm">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">{t('live.popper.day')}</th>
                <th scope="col">{t('live.popper.season')}</th>
                <th scope="col">{t('live.popper.all')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{t('live.popper.kills')}</th>
                <td>{ playerResume ? playerResume.stats.day.nbKills : '' }</td>
                <td>{ playerResume ? playerResume.stats.season.nbKills : '' }</td>
                <td>{ playerResume ? playerResume.stats.all.nbKills : '' }</td>
              </tr>
              <tr>
                <th scope="row">{t('live.popper.deaths')}</th>
                <td>{ playerResume ? playerResume.stats.day.nbDeaths : '' }</td>
                <td>{ playerResume ? playerResume.stats.season.nbDeaths : '' }</td>
                <td>{ playerResume ? playerResume.stats.all.nbDeaths : '' }</td>
              </tr>
              <tr>
                <th scope="row">{t('live.popper.ratio')}</th>
                <td>{ playerResume ? playerResume.stats.day.ratio.toFixed(2) : '' }</td>
                <td>{ playerResume ? playerResume.stats.season.ratio.toFixed(2) : '' }</td>
                <td>{ playerResume ? playerResume.stats.all.ratio.toFixed(2) : '' }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { playerState, PlayerPopper };
