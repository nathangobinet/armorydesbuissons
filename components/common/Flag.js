/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React from 'react';
import flagsInfo from 'svg-country-flags/countries.json';

function Flag(props) {
  const { country, width = '35px', height = '25px' } = props;
  let flag;
  let description;
  if (country) {
    const coutryPath = country.toLowerCase();
    try {
      flag = require(`svg-country-flags/svg/${coutryPath}.svg`);
    } catch (err) {
      flag = require('../../public/svgs/unknown-flag.svg');
    }
    const countryName = flagsInfo[country.toUpperCase()];
    description = `${countryName} flag`;
  } else {
    flag = require('../../public/svgs/unknown-flag.svg');
    description = 'Unknow country';
  }
  return (
    <img
      width={width}
      height={height}
      src={(flag.default) ? flag.default : flag} // Try to fix a strange bug on flag dynamic import
      alt={description}
      title={description}
    />
  );
}

export default Flag;
