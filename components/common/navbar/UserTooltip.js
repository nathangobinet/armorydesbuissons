/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { createPopper } from '@popperjs/core';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import acSvg from '../../../public/svgs/icons/ac-round.svg';
import { useAuth } from '../../../helpers/user';
import config from '../../../helpers/config';

const TOOLTIP_ID = 'nav-user-tooltip';
// eslint-disable-next-line import/no-mutable-exports

let popperInstance;
let setDisplay;

function destroy() {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

function hide(event) {
  const tooltip = document.getElementById(TOOLTIP_ID);
  const path = event.path || (event.composedPath && event.composedPath());
  if (!path.includes(tooltip)) {
    document.removeEventListener('click', hide);
    setDisplay(false);
    destroy();
  }
}

export function toogleUserPopper(refId) {
  const ref = document.getElementById(refId);
  const tooltip = document.getElementById(TOOLTIP_ID);
  popperInstance = createPopper(ref, tooltip, {
    placement: 'bottom-end',
    modifiers: [{ name: 'arrow' }, {
      name: 'offset',
      options: {
        offset: [0, 30],
      },
    }],
  });
  setDisplay(true);
  document.addEventListener('click', hide);
}

function UserCardContent(props) {
  const {
    id, lastPseudo, ac, level,
  } = props;
  const { t } = useTranslation();
  return (
    <div>
      <div style={{
        fontFamily: '"Montserrat", sans-serif', fontSize: 25, fontWeight: 600, marginBottom: 8,
      }}
      >
        {lastPseudo}
      </div>
      <div
        style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 20 }}
        className="d-flex align-items-center justify-content-around mb-4"
      >
        <div className="d-flex align-items-center">
          <img src={acSvg} alt="" width="30" className="mr-2" />
          <em>{ac}</em>
        </div>
        <div>
          <em>
            {t('common:navbar.level')}
            {' '}
            {level}
          </em>
        </div>
      </div>
      <Link href={`/p/${encodeURIComponent(id)}`}>
        <a className="btn btn-primary btn-block">{t('common:navbar.btnViewProfile')}</a>
      </Link>
      <a href={`${config.httpserver}/api/auth/logout`} className="btn btn-accent btn-block">{t('common:navbar.btnLogout')}</a>
    </div>
  );
}

export function UserTooltip() {
  const authInfo = useAuth();
  const { t } = useTranslation();
  const [isDisplay, setIsDisplay] = useState(false);
  setDisplay = setIsDisplay;

  const CardContent = () => {
    if (!authInfo) return (<div>Loading...</div>);
    if (!authInfo.auth) return <a href={`${config.httpserver}/api/auth/steam`} className="btn btn-primary btn-block">{t('common:navbar.btnSteam')}</a>;
    return (
      <UserCardContent
        id={authInfo.id}
        lastPseudo={(authInfo.alreadyConnected) ? authInfo.playerInfo.lastPseudo : t('common:navbar.unknowName')}
        ac={(authInfo.alreadyConnected) ? authInfo.playerInfo.ac : 0}
        level={(authInfo.alreadyConnected) ? authInfo.playerInfo.level : 0}
      />
    );
  };

  return (
    <div
      className="position-absolute"
      style={{ visibility: (isDisplay) ? 'visible' : 'hidden', opacity: (isDisplay) ? 1 : 0 }}
      id={TOOLTIP_ID}
    >
      <div id="arrow" data-popper-arrow />
      <div className="card" style={{ width: '100%' }}>
        <div className="text-center">
          <CardContent />
        </div>
      </div>
    </div>
  );
}
