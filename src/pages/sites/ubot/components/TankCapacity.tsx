import React from 'react';

type Props = {
  tankCapacity: number;
  tankLevel: number;
};

const TankCapacity: React.FC<Props> = ({ tankCapacity, tankLevel }) => {
  return (
    <div className="ubot-water-level d-flex gap-2">
      <div className="ubot-level-img">
        <svg
          width="50"
          height="50"
          viewBox="0 0 81 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="40.9062"
            cy="40"
            r="39"
            stroke="#4DABF7"
            strokeWidth="2"
          />
          <path
            d="M75.9942 41.3652C75.9942 60.6952 60.3241 76.3655 40.9942 76.3655C21.6642 76.3655 5.99416 60.6955 5.99416 41.3655C5.99416 22.0356 3.66418 46.8652 22.9941 46.8652C42.3241 46.8652 64.4941 37.3652 75.9942 41.3652Z"
            fill="#4DABF7"
          />
        </svg>
      </div>
      <div className="ubot-level-info d-flex flex-column justify-content-center align-items-center">
        {tankCapacity && tankCapacity > 0 ? (
          <h4 className="mb-0">
            {tankCapacity}
            <small> Ltr </small>
          </h4>
        ) : null}
        <p className="my-0">{`${tankLevel ?? 0} % Level`}</p>
      </div>
    </div>
  );
};

export default TankCapacity;
