import React from 'react';
import Chart from 'react-apexcharts';
import { capitalizeFirstLetter } from '@uhub/helpers';
import { ApexOptions } from 'apexcharts';
import { DashboardDeviceInfo } from '../types/UnifiedDashboard';

type Props = {
  data: DashboardDeviceInfo;
};
const DeviceInfo: React.FC<Props> = ({ data }) => {
  const labels: string[] = Object.keys(data);
  const colors: string[] = ['#5E3FBE', '#E5DAFB', '#F4F0FD'];
  const series = Object.values(data);

  const options: ApexOptions = {
    labels,
    colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <>
      <div className="chart-container">
        <Chart
          options={options}
          series={series}
          type="pie"
          height="100%"
          className="apex-charts"
        />
      </div>
      <div className="d-flex flex-column gap-1">
        {labels?.map((_, indexKey) => (
          <div
            key={indexKey}
            className="d-flex justify-content-between align-items-center gap-2">
            <div className="d-flex align-items-center">
              <i
                className="bx bxs-circle me-1"
                style={{ color: colors[indexKey] }}
              />
              {capitalizeFirstLetter(labels[indexKey])}
            </div>
            <span className="fw-semibold text-black">{series[indexKey]}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeviceInfo;
