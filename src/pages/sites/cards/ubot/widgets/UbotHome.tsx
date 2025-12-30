import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Site } from '../../../../../types/site';
import TankLevel from '../../../ubot/components/TankLevel';
import TankCapacity from '../../../ubot/components/TankCapacity';
import TankLevelGraph from '../graphs/TankLevelGraph';
import {
  CumulativeRainfallRecord,
  HourlyRainfallRecord,
  UbotSummaryRecord,
} from '../../../../../types/ubot';
import AvergaeRainfall from './AverageRainfall';

type Props = {
  ubotDetail: Site;
};

const UbotHome: React.FC<Props> = ({ ubotDetail }) => {
  const ubotRecords: UbotSummaryRecord[] = [
    {
      id: 2238,
      site_id: 1,
      pressure_reading: 753,
      tank_level: 30.12,
      battery_voltage: 4.08,
      solar_voltage: 5.16,
      rainfall: 27,
      message_date: '2024-04-03 00:00:00',
    },
    {
      id: 2239,
      site_id: 1,
      pressure_reading: 735,
      tank_level: 29.4,
      battery_voltage: 4.15,
      solar_voltage: 5.22,
      rainfall: 6,
      message_date: '2024-04-03 01:00:00',
    },
    {
      id: 2240,
      site_id: 1,
      pressure_reading: 716,
      tank_level: 28.64,
      battery_voltage: 4.18,
      solar_voltage: 5.28,
      rainfall: 0,
      message_date: '2024-04-03 02:00:00',
    },
    {
      id: 2241,
      site_id: 1,
      pressure_reading: 698,
      tank_level: 27.92,
      battery_voltage: 4.2,
      solar_voltage: 5.28,
      rainfall: 0,
      message_date: '2024-04-03 03:00:00',
    },
    {
      id: 2242,
      site_id: 1,
      pressure_reading: 680,
      tank_level: 27.2,
      battery_voltage: 4.2,
      solar_voltage: 5.13,
      rainfall: 0,
      message_date: '2024-04-03 04:00:00',
    },
    {
      id: 2243,
      site_id: 1,
      pressure_reading: 662,
      tank_level: 26.48,
      battery_voltage: 4.2,
      solar_voltage: 4.77,
      rainfall: 0,
      message_date: '2024-04-03 05:00:00',
    },
    {
      id: 2244,
      site_id: 1,
      pressure_reading: 643,
      tank_level: 25.72,
      battery_voltage: 4.2,
      solar_voltage: 3.75,
      rainfall: 0,
      message_date: '2024-04-03 06:00:00',
    },
    {
      id: 2245,
      site_id: 1,
      pressure_reading: 625,
      tank_level: 25,
      battery_voltage: 4.2,
      solar_voltage: 2.25,
      rainfall: 0,
      message_date: '2024-04-03 07:00:00',
    },
    {
      id: 2246,
      site_id: 1,
      pressure_reading: 607,
      tank_level: 24.28,
      battery_voltage: 4.2,
      solar_voltage: 0.87,
      rainfall: 0,
      message_date: '2024-04-03 08:00:00',
    },
    {
      id: 2247,
      site_id: 1,
      pressure_reading: 589,
      tank_level: 23.56,
      battery_voltage: 4.1,
      solar_voltage: 0.09,
      rainfall: 0,
      message_date: '2024-04-03 09:00:00',
    },
    {
      id: 2248,
      site_id: 1,
      pressure_reading: 570,
      tank_level: 22.8,
      battery_voltage: 4,
      solar_voltage: 0,
      rainfall: 0,
      message_date: '2024-04-03 10:00:00',
    },
  ];

  const ubotHourlyRainfall: HourlyRainfallRecord[] = [
    {
      id: 2262,
      rainfall: 24,
      message_date: '2024-04-04 00:00:00',
    },
    {
      id: 2263,
      rainfall: 5,
      message_date: '2024-04-04 01:00:00',
    },
    {
      id: 2264,
      rainfall: 0,
      message_date: '2024-04-04 02:00:00',
    },
    {
      id: 2265,
      rainfall: 0,
      message_date: '2024-04-04 03:00:00',
    },
    {
      id: 2266,
      rainfall: 0,
      message_date: '2024-04-04 04:00:00',
    },
    {
      id: 2267,
      rainfall: 0,
      message_date: '2024-04-04 05:00:00',
    },
    {
      id: 2268,
      rainfall: 0,
      message_date: '2024-04-04 06:00:00',
    },
    {
      id: 2269,
      rainfall: 0,
      message_date: '2024-04-04 07:00:00',
    },
    {
      id: 2270,
      rainfall: 0,
      message_date: '2024-04-04 08:00:00',
    },
    {
      id: 2271,
      rainfall: 0,
      message_date: '2024-04-04 09:00:00',
    },
    {
      id: 2272,
      rainfall: 0,
      message_date: '2024-04-04 10:00:00',
    },
    {
      id: 2273,
      rainfall: 0,
      message_date: '2024-04-04 11:00:00',
    },
    {
      id: 2274,
      rainfall: 0,
      message_date: '2024-04-04 12:00:00',
    },
    {
      id: 2275,
      rainfall: 0,
      message_date: '2024-04-04 13:00:00',
    },
    {
      id: 2276,
      rainfall: 0,
      message_date: '2024-04-04 14:00:00',
    },
    {
      id: 2277,
      rainfall: 0,
      message_date: '2024-04-04 15:00:00',
    },
    {
      id: 2278,
      rainfall: 0,
      message_date: '2024-04-04 16:00:00',
    },
    {
      id: 2279,
      rainfall: 0,
      message_date: '2024-04-04 17:00:00',
    },
    {
      id: 2280,
      rainfall: 0,
      message_date: '2024-04-04 18:00:00',
    },
    {
      id: 2281,
      rainfall: 0,
      message_date: '2024-04-04 19:00:00',
    },
    {
      id: 2282,
      rainfall: 0,
      message_date: '2024-04-04 20:00:00',
    },
    {
      id: 2283,
      rainfall: 3,
      message_date: '2024-04-04 21:00:00',
    },
    {
      id: 2284,
      rainfall: 14,
      message_date: '2024-04-04 22:00:00',
    },
    {
      id: 2285,
      rainfall: 22,
      message_date: '2024-04-04 23:00:00',
    },
    {
      id: 2286,
      rainfall: 20,
      message_date: '2024-04-05 00:00:00',
    },
    {
      id: 2287,
      rainfall: 4,
      message_date: '2024-04-05 01:00:00',
    },
    {
      id: 2288,
      rainfall: 0,
      message_date: '2024-04-05 02:00:00',
    },
    {
      id: 2289,
      rainfall: 0,
      message_date: '2024-04-05 03:00:00',
    },
    {
      id: 2290,
      rainfall: 0,
      message_date: '2024-04-05 04:00:00',
    },
    {
      id: 2291,
      rainfall: 0,
      message_date: '2024-04-05 05:00:00',
    },
    {
      id: 2292,
      rainfall: 0,
      message_date: '2024-04-05 06:00:00',
    },
    {
      id: 2293,
      rainfall: 0,
      message_date: '2024-04-05 07:00:00',
    },
    {
      id: 2294,
      rainfall: 0,
      message_date: '2024-04-05 08:00:00',
    },
    {
      id: 2295,
      rainfall: 0,
      message_date: '2024-04-05 09:00:00',
    },
    {
      id: 2296,
      rainfall: 0,
      message_date: '2024-04-05 10:00:00',
    },
    {
      id: 2297,
      rainfall: 0,
      message_date: '2024-04-05 11:00:00',
    },
    {
      id: 2298,
      rainfall: 0,
      message_date: '2024-04-05 12:00:00',
    },
    {
      id: 2299,
      rainfall: 0,
      message_date: '2024-04-05 13:00:00',
    },
    {
      id: 2300,
      rainfall: 0,
      message_date: '2024-04-05 14:00:00',
    },
    {
      id: 2301,
      rainfall: 0,
      message_date: '2024-04-05 15:00:00',
    },
    {
      id: 2302,
      rainfall: 0,
      message_date: '2024-04-05 16:00:00',
    },
    {
      id: 2303,
      rainfall: 0,
      message_date: '2024-04-05 17:00:00',
    },
    {
      id: 2304,
      rainfall: 0,
      message_date: '2024-04-05 18:00:00',
    },
    {
      id: 2305,
      rainfall: 0,
      message_date: '2024-04-05 19:00:00',
    },
    {
      id: 2306,
      rainfall: 0,
      message_date: '2024-04-05 20:00:00',
    },
    {
      id: 2307,
      rainfall: 2,
      message_date: '2024-04-05 21:00:00',
    },
    {
      id: 2308,
      rainfall: 12,
      message_date: '2024-04-05 22:00:00',
    },
    {
      id: 2309,
      rainfall: 18,
      message_date: '2024-04-05 23:00:00',
    },
    {
      id: 2310,
      rainfall: 16,
      message_date: '2024-04-06 00:00:00',
    },
    {
      id: 2311,
      rainfall: 3,
      message_date: '2024-04-06 01:00:00',
    },
    {
      id: 2312,
      rainfall: 0,
      message_date: '2024-04-06 02:00:00',
    },
    {
      id: 2313,
      rainfall: 0,
      message_date: '2024-04-06 03:00:00',
    },
    {
      id: 2314,
      rainfall: 0,
      message_date: '2024-04-06 04:00:00',
    },
    {
      id: 2315,
      rainfall: 0,
      message_date: '2024-04-06 05:00:00',
    },
    {
      id: 2316,
      rainfall: 0,
      message_date: '2024-04-06 06:00:00',
    },
    {
      id: 2317,
      rainfall: 0,
      message_date: '2024-04-06 07:00:00',
    },
    {
      id: 2318,
      rainfall: 0,
      message_date: '2024-04-06 08:00:00',
    },
    {
      id: 2319,
      rainfall: 0,
      message_date: '2024-04-06 09:00:00',
    },
    {
      id: 2320,
      rainfall: 0,
      message_date: '2024-04-06 10:00:00',
    },
    {
      id: 2321,
      rainfall: 0,
      message_date: '2024-04-06 11:00:00',
    },
    {
      id: 2322,
      rainfall: 0,
      message_date: '2024-04-06 12:00:00',
    },
    {
      id: 2323,
      rainfall: 0,
      message_date: '2024-04-06 13:00:00',
    },
    {
      id: 2324,
      rainfall: 0,
      message_date: '2024-04-06 14:00:00',
    },
    {
      id: 2325,
      rainfall: 0,
      message_date: '2024-04-06 15:00:00',
    },
    {
      id: 2326,
      rainfall: 0,
      message_date: '2024-04-06 16:00:00',
    },
    {
      id: 2327,
      rainfall: 0,
      message_date: '2024-04-06 17:00:00',
    },
    {
      id: 2328,
      rainfall: 0,
      message_date: '2024-04-06 18:00:00',
    },
  ];

  const ubotCumulativeRainfall: CumulativeRainfallRecord[] = [
    {
      id: 95,
      rainfall: 365,
      date: '2024-04-04 18:00:00',
    },
    {
      id: 96,
      rainfall: 428,
      date: '2024-04-05 18:00:00',
    },
    {
      id: 97,
      rainfall: 479,
      date: '2024-04-06 18:00:00',
    },
  ];

  return (
    <Row>
      <Col lg={7} md={12} sm={12}>
        <TankLevelGraph data={ubotRecords} />
      </Col>
      <Col lg={5} md={12} sm={12}>
        <div className="box-wrapper mt-1 d-flex  flex-column justify-content-center align-items-center gap-2 flex-wrap">
          <h6 className="text-black text-uppercase">
            Tank Level Info - {ubotDetail.id}
          </h6>
          <TankLevel tankLevel={81} />
          <TankCapacity tankCapacity={10000} tankLevel={81} />
        </div>
      </Col>
      <Col>
        <AvergaeRainfall
          cumulativeRainfallRecord={ubotCumulativeRainfall}
          hourlyRainfallRecord={ubotHourlyRainfall}
        />
      </Col>
    </Row>
  );
};
export default UbotHome;
