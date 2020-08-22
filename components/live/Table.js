/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTransition, animated } from 'react-spring';

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
    <div className="table-container">
      <table className="table dynamic-table">
        <thead>
          <tr className="d-flex w-100">
            {headers.map((header) => (
              <th key={`${id}th${header.text}`} scope="col" className={`col-${header.size}`}>
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            transitions.map(({
              key, item, props: { y, ...rest },
            }) => (
              <animated.tr
                className="d-flex w-100"
                key={key}
                style={{ transform: y.interpolate((newy) => `translate3d(0,${newy}px,0)`), ...rest }}
              >
                {item.data.map((cell, i) => <td className={`col-${headers[i].size}`} key={`${item.key}td${i}`}>{cell}</td>)}
              </animated.tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
