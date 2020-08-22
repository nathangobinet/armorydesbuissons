import React, { useState } from 'react';

function displayImgOrIcon(icon) {
  if (icon.type === 'image') return <img style={{ marginBottom: '2px' }} src={icon.obj} width="18" height="18" alt={icon.alt} />;
  return <i className={`fa ${icon.class}`} />;
}

function getSubIconsPart(subIcons, isHiden) {
  if (!subIcons) return null;
  const iconsList = subIcons.map((subIcon) => (
    <button key={subIcon.label} type="button" aria-label={subIcon.label} onClick={subIcon.func} className="opacity-interaction px-1 button-nav">
      {displayImgOrIcon(subIcon)}
    </button>
  ));
  return <div className={`nav-to-select d-flex px-2 ${isHiden ? 'nav-select-hide' : ''}`}>{iconsList}</div>;
}

function NavIcon({ icon, subIcons = null }) {
  const [isHiden, setHiden] = useState(true);
  const subIconPart = getSubIconsPart(subIcons, isHiden);

  // https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
  const handleBlur = (e) => {
    const { currentTarget } = e;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) setHiden(true);
    }, 0);
  };

  return (
    <div className={subIcons ? `nav-select d-flex justify-content-between ${isHiden ? '' : 'nav-select-border'}` : ''} onBlur={handleBlur}>
      <div className="d-flex py-1 px-2">
        <button
          type="button"
          aria-label={icon.label}
          className="nav-item nav-link opacity-interaction px-2 button-nav"
          onClick={() => setHiden(!isHiden)}
        >
          {displayImgOrIcon(icon)}
        </button>
      </div>
      {subIconPart}
    </div>
  );
}

export default NavIcon;
