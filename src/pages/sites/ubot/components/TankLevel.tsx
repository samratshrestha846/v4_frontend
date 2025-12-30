import React, { FC } from 'react';
import CustomLoader from '../../../../components/CustomLoader';
import usePrepareTankLevelData from '../detail/hooks/usePrepareTankLevelData';

type Props = {
  tankLevel: number;
};
const TankLevel: FC<Props> = ({ tankLevel }) => {
  const { tankLevels, loading } = usePrepareTankLevelData(tankLevel);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="ubot-water-tank">
      {tankLevels && (
        <svg
          width="260"
          height="260"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 410 480"
          xmlSpace="preserve">
          {tankLevels &&
            tankLevels.map((item) => (
              <g key={item.level}>
                <path
                  style={{ fill: '#4EC7EC' }}
                  id={String(item.level)}
                  d={item.d}
                />
                <text
                  style={{
                    fill: '#ffffff',
                    fontFamily: 'Poppins-Bold',
                    fontSize: '12px',
                  }}
                  transform={`matrix(1 0 0 1 186 ${item.textHeight})`}>
                  {`${item.level} %`}
                </text>
              </g>
            ))}
          <g>
            <path
              style={{
                fill: 'none',
                stroke: '#808184',
                strokeWidth: 5,
                strokeMiterlimit: 10,
              }}
              d="M137.73,16.95c0,0,71.51-33.28,139.97,2.6V31.1c0,0,117.95,20.21,123.31,51.96v60.21c0,0,20.21,11.55,0,24.33
		l0.82,30.52c0,0,15.67,14.02,0,26.39v31.34c0,0,17.32,11.13,0,26.81l0.41,20.62c0,0,14.02,16.08,0,31.75v25.16
		c0,0,17.73,16.08-0.41,34.64v44.95c0,0-43.77,45.39-188.6,36.08c0,0-150.14,9.3-199.31-32.55v-46.5c0,0-23.92-22.59,0-38.53
		l-0.66-23.25c0,0-20.59-12.62,0-33.22l0.66-19.27c0,0-19.27-11.96-1.99-26.57v-32.55c0,0-19.27-10.63,0.66-25.91v-33.22
		c0,0-21.26-13.95,1.33-24.58l-0.66-55.14c0,0,31.22-52.48,120.91-52.48L137.73,16.95z"
            />
            <path
              style={{
                fill: 'none',
                stroke: '#808184',
                strokeWidth: 5,
                strokeMiterlimit: 10,
              }}
              d="M12.29,96.03c0,0,276.02,36.8,388.72,0"
            />
            <path
              style={{
                fill: 'none',
                stroke: '#808184',
                strokeWidth: 5,
                strokeMiterlimit: 10,
              }}
              d="M136.58,30.4c0,0,76.52,15.09,141.11-0.13"
            />
            <path
              style={{
                fill: 'none',
                stroke: '#808184',
                strokeWidth: 5,
                strokeMiterlimit: 10,
              }}
              d="M136.09,21.27c0,0,76.51,15.16,141.11,0"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default TankLevel;
