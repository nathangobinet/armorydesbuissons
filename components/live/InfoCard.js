import React from 'react';
import { useSpring, animated } from 'react-spring';

function InfoCard(props) {
  const {
    bg, icon, number, description,
  } = props;
  const spring = useSpring({ number, from: { number: 0 } });
  return (
    <div className="col-xl-3 col-md-6 py-2">
      <div className={`card ${bg} shadow`}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="card-icon">
            <i className={`fas ${icon}`} />
          </div>
          <div className="card-text">
            <animated.div>{spring.number.interpolate((x) => x.toFixed(0))}</animated.div>
            <div>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
