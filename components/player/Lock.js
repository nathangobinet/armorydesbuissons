import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

export default function Lock({ id }) {
  const { t } = useTranslation();
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip id={`lock-tooltip-${id}`}>{t('player:lock')}</Tooltip>
        )}
    >
      <h3 style={{ cursor: 'pointer' }}><i className="fas fa-lock ml-2" /></h3>
    </OverlayTrigger>
  );
}
