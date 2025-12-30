/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card } from 'react-bootstrap';
import { DashboardAnalytics } from '../../types/dashboard/dashboard';

type Props = {
  data: DashboardAnalytics;
};

const SitesCount: React.FC<Props> = ({ data }) => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    formatGraphData();
    setIsLoading(false);
  }, []);

  const formatGraphData = () => {
    const arr = [data.running_sites, data.stopped_sites, data.alarmed_sites];
    setChartData(arr);
  };

  const apexDonutOpts: ApexOptions = {
    chart: {
      height: 320,
      type: 'pie',
    },
    labels: ['Running', 'Stopped', 'Alarmed'],
    colors: ['#0acf97', '#6c757d', '#c53733'],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      // verticalAlign: 'middle',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h4 className="header-title mb-3">
            Sites {` : ${data?.sites_count}`}
          </h4>
          {!isLoading && (
            <>
              <Chart
                options={apexDonutOpts}
                series={chartData}
                type="donut"
                height={320}
                className="apex-charts"
              />
              <div className="row text-center mt-2">
                <div className="col-4">
                  <h4 className="font-weight-normal">
                    <span>{data?.running_sites}</span>
                  </h4>
                  <p className="text-muted mb-0">Running</p>
                </div>
                <div className="col-4">
                  <h4 className="font-weight-normal">
                    <span>{data?.stopped_sites}</span>
                  </h4>
                  <p className="text-muted  mb-0">Stopped</p>
                </div>
                <div className="col-4">
                  <h4 className="font-weight-normal">
                    <span>{data?.alarmed_sites}</span>
                  </h4>
                  <p className="text-muted mb-0">Alarmed</p>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SitesCount;
