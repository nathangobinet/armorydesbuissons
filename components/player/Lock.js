import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Lock({ id }) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip id={`lock-tooltip-${id}`}>
          Only you can see this information
        </Tooltip>
        )}
    >
      <h3 style={{ cursor: 'pointer' }}><i className="fas fa-lock ml-2" /></h3>
    </OverlayTrigger>
  );
}
