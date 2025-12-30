import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import CustomLoader from '../../../components/CustomLoader';
import {
  UdoseAnalyticsContextProvider,
  useUdoseAnalyticsContext,
} from '../../../context/useUdoseAnalyticsContext';
import useCostNutrientAnalytics from './hooks/useCostNutrientAnalytics';
import useDashboardCounts from './hooks/useDashboardCounts';
import AnalyticsCount from '../components/analytics/AnalyticsCount';

import PropertyProfileDetail from '../components/analytics/PropertyProfileDetail';
import NutrientConsumptionDonutChart from '../components/analytics/NutrientConsumptionDonutChart';
import SupplementIntakePieChart from '../components/analytics/SupplementIntakePieChart';
import SiteStatus from '../components/analytics/SiteStatus';
import AverageWeightChart from './optiweigh/AverageWeightChart';
import WeightDistribution from './optiweigh/WeightDistribution';
import ErrorMessage from '../../../components/ErrorMessage';
import { Property } from '../../../types/property/propertyList';
import SettingsCard from '../components/SettingsCard';

type Props = {
  property?: Property;
};

const PropertyAnalytics: React.FC<Props> = ({ property }) => {
  return (
    <UdoseAnalyticsContextProvider>
      <PropertyDetailAnalytics property={property} />
    </UdoseAnalyticsContextProvider>
  );
};

export default PropertyAnalytics;

const PropertyDetailAnalytics = ({ property }: Props) => {
  const { saveAnalytics } = useUdoseAnalyticsContext();

  const {
    data: countData,
    isFetching: isFetchingCount,
    error: countError,
  } = useDashboardCounts(property?.id);

  const {
    data: costNutrientData,
    isFetching: isFetchingCostNutrient,
    error: costNutrientError,
  } = useCostNutrientAnalytics(property?.id);

  useEffect(() => {
    if (countData && costNutrientData) {
      saveAnalytics({
        countData,
        costNutrientData,
      });
    }
  }, [countData, costNutrientData]);

  if (isFetchingCount || isFetchingCostNutrient) return <CustomLoader />;

  if (countError || costNutrientError) return <ErrorMessage />;

  return (
    <>
      <Row>
        <Col md={9}>
          <AnalyticsCount />
        </Col>
        <Col md={3}>
          <PropertyProfileDetail property={property} />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <NutrientConsumptionDonutChart
            data={costNutrientData?.daily_avg_nutrient_consumption ?? {}}
          />
        </Col>
        <Col md={4}>
          <SupplementIntakePieChart
            data={costNutrientData?.daily_avg_supplement_intake ?? []}
          />
        </Col>
        <Col md={4}>
          <SiteStatus />
          <SettingsCard propertyId={property?.id} />
        </Col>
      </Row>
      {property?.settings?.optiweigh?.is_enable ? (
        <div className="p-2 bg-white rounded-2 mb-1">
          <Row>
            <Col md={6}>
              <AverageWeightChart />
            </Col>
            <Col md={6}>
              <WeightDistribution />
            </Col>
          </Row>
          <p className=" text-center text-black-50 font-12">
            Average weight data supplied by external provider, as per individual
            customer agreement with Optiweigh
          </p>
        </div>
      ) : null}
    </>
  );
};
