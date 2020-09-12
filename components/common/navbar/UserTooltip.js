import React, { useState } from 'react';
import { createPopper } from '@popperjs/core';

import { useTranslation } from '../../../helpers/i18n';
import acSvg from '../../../public/svgs/icons/ac-round.svg';
import { useAuth } from '../../../helpers/user';

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
            Lvl.
            {level}
          </em>
        </div>
      </div>
      <a href={`/p/${id}`} type="button" className="btn btn-primary btn-block">View profile</a>
      <a href="http://localhost:3005/auth/logout" type="button" className="btn btn-accent btn-block">Logout</a>
    </div>
  );
}

export function UserTooltip() {
  const authInfo = useAuth();
  const { t } = useTranslation('common');
  const [isDisplay, setIsDisplay] = useState(false);
  setDisplay = setIsDisplay;

  const CardContent = () => {
    if (!authInfo) return (<div>Loading...</div>);
    if (!authInfo.auth) return <a href="http://localhost:3005/auth/steam" type="button" className="btn btn-primary btn-block">Connect with steam</a>;
    return (
      <UserCardContent
        id={authInfo.id}
        lastPseudo={(authInfo.alreadyConnected) ? authInfo.playerInfo.lastPseudo : t('profile.unknowName')}
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
