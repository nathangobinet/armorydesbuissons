/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTransition, animated } from 'react-spring';
import useTranslation from 'next-translate/useTranslation';

import styles from '../../styles/Live.module.css';

function Table(props) {
  const { t } = useTranslation();
  const {
    id, headers, rows, emptyTableMessage = t('live:defaultEmptyTableMessage'),
  } = props;

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
          <tr style={{ position: 'absolute' }} className="d-flex w-100">
            {headers.map((header) => (
              <th key={`${id}th${header.text}`} scope="col" className={`col-${header.size}  hide-overflow`}>
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            (transitions.length === 0)
              ? (
                <tr>
                  <td
                    style={{ transform: `translate3d(0,${rowHeight}px,0)` }}
                    colSpan={headers.length}
                    className="text-center"
                  >
                    {emptyTableMessage}
                  </td>
                </tr>
              ) : ''
          }
          {
            transitions.map(({
              key, item, props: { y, ...rest },
            }) => (
              <animated.tr
                className="d-flex w-100"
                key={key}
                style={{
                  position: 'absolute', transform: y.interpolate((newy) => `translate3d(0,${newy}px,0)`), ...rest,
                }}
              >
                {item.data.map((cell, i) => <td className={`col-${headers[i].size} hide-overflow`} key={`${item.key}td${i}`}>{cell}</td>)}
              </animated.tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
