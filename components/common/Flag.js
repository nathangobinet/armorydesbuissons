/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React from 'react';
import flagsInfo from 'svg-country-flags/countries.json';

function Flag(props) {
  const { country, size = '35px' } = props;
  let flag;
  try {
    flag = require(`svg-country-flags/svg/${country}.svg`);
  } catch (err) {
    flag = require('../../assets/svgs/unknown-flag.svg');
  }
  const countryName = flagsInfo[country.toUpperCase()];
  const description = `${countryName} flag`;
  return (
    <img width={size} src={flag} alt={description} title={description} />
  );
}

export default Flag;
