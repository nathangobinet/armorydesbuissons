import React from 'react';

export default function NumberPresentation({ number, title }) {
  return (
    <div className="px-2">
      <div className="text-accent" style={{ fontWeight: 600, lineHeight: 1, fontSize: 20 }}>{title}</div>
      <div style={{
        fontFamily: '"Montserrat", sans-serif', fontSize: 40, fontWeight: 600, lineHeight: 0.85, marginLeft: 1,
      }}
      >
        {number}
      </div>
    </div>
  );
}
