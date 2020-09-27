/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTransition, animated } from 'react-spring';

import styles from '../../styles/Live.module.css';

function Table({ id, headers, rows }) {
  const rowHeight = 52;
  let height = 0;

  function getY() {
    height += rowHeight;
    return height;
  }

  const transitions = useTransition(
    // eslint-disable-next-line no-return-assign
    rows.map((data) => ({ ...data, y: getY() })),
    (row) => row.key,
    {
      from: { opacity: 0 },
      update: ({ y }) => ({ y }),
      enter: ({ y }) => ({ opacity: 1, y }),
      leave: { opacity: 0 },
    },
  );

  return (
    <div className={styles['table-container']}>
      <table className={`table ${styles['live-table']} ${styles['dynamic-table']}`}>
        <thead>
          <div style={{ position: 'relative' }}>
            <tr className="d-flex w-100 hide-overflow">
              {headers.map((header) => (
                <th key={`${id}th${header.text}`} scope="col" className={`col-${header.size}`}>
                  {header.text}
                </th>
              ))}
            </tr>
          </div>
        </thead>
        <tbody>
          {
            transitions.map(({
              key, item, props: { y, ...rest },
            }) => (
              <div key={key} style={{ position: 'relative' }}>
                <animated.tr
                  className="d-flex w-100 hide-overflow"
                  key={key}
                  style={{ transform: y.interpolate((newy) => `translate3d(0,${newy}px,0)`), ...rest }}
                >
                  {item.data.map((cell, i) => <td className={`col-${headers[i].size} hide-overflow`} key={`${item.key}td${i}`}>{cell}</td>)}
                </animated.tr>
              </div>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
