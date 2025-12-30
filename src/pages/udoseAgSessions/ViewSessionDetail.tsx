import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { prepareDynamicUrl } from '../../helpers';
import WaterFertilizerFlowBarChart from './components/WaterFertilizerFlowBarChart';
import UdoseAgMap from './components/UdoseAgMap';
import UdoseAgSessionEndSummary from './components/UdoseAgSessionEndSummary';
import UdoseAgSessionStartInfo from './components/UdoseAgSessionStartInfo';
import UdoseAgArmedSettings from './components/UdoseAgArmedSettings';
import { UDOSE_AG_LIST, UDOSE_AG_VIEW } from '../../constants/path';
import UdoseAgSessionSummaryInfo from './components/UdoseAgSessionSummaryInfo';
import useReadUdoseAgSessionSummary from './hooks/useReadUdoseAgSessionSummary';
import useFetchUdoseAgStartMessage from './hooks/useFetchUdoseAgStartMessage';
import CoverageAreaAndFertilizerInfo from './components/CoverageAreaAndFertilizerInfo';
import FertilizerAnalysis from './components/FertilizerAnalysis';
import useFetchFertilizerAnalysisBySessionSummary from './hooks/useFetchFertilizerAnalysisBySessionSummary';
import FertilizerAnalysisPerHeactarePieChart from './components/FertilizerAnalysisPerHeactarePieChart';
import FertilizerAnalysisPerHeactarePerPlantPieChart from './components/FertilizerAnalysisPerHeactarePerPlantPieChart';
import { UDOSE_AG_SESSION_STATUS_COMPLETED } from '../../constants/udoseAg';

const ViewSessionDetail: React.FC = () => {
  const { id } = useParams();

  const {
    data: sessionSummary,
    isFetching: isFetchingSessionSummary,
    isError: isErrorSessionSummary,
  } = useReadUdoseAgSessionSummary(Number(id));

  const {
    data: startMessage,
    isFetching: isFetchingStartMessage,
    isError: isErrorStartMessage,
  } = useFetchUdoseAgStartMessage(
    Number(sessionSummary?.udose_ag_id),
    Number(sessionSummary?.session_id)
  );

  const {
    data: fertilizerAnalysis,
    isFetching: isFetchingFertilizerAnalysis,
    isError: isErrorFertilizerAnalysis,
  } = useFetchFertilizerAnalysisBySessionSummary(Number(id));

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uDose Ags', path: UDOSE_AG_LIST },
          {
            label: `${sessionSummary?.udose_ag?.name ?? 'uDose Ag Detail'}`,
            path: prepareDynamicUrl(UDOSE_AG_VIEW, sessionSummary?.udose_ag_id),
          },
          {
            label: `uDose Ag Session Summary Detail`,
            path: '',
            active: true,
          },
        ]}
        title="uDose Ag Session Summary Detail"
      />

      <UdoseAgSessionSummaryInfo
        sessionSummary={sessionSummary}
        isErrorSessionSummary={isErrorSessionSummary}
        isFetchingSessionSummary={isFetchingSessionSummary}
      />

      <Row>
        <Col md={6}>
          <UdoseAgArmedSettings
            udoseAgId={sessionSummary?.udose_ag_id}
            sessionId={sessionSummary?.session_id}
          />
        </Col>
        <Col md={6}>
          <UdoseAgSessionStartInfo
            startMessage={startMessage}
            isErrorStartMessage={isErrorStartMessage}
            isFetchingStartMessage={isFetchingStartMessage}
          />
        </Col>
      </Row>

      <WaterFertilizerFlowBarChart
        udoseAgId={sessionSummary?.udose_ag_id}
        sessionId={sessionSummary?.session_id}
      />
      {sessionSummary?.status === UDOSE_AG_SESSION_STATUS_COMPLETED ||
        (sessionSummary?.ended_at && (
          <UdoseAgSessionEndSummary
            udoseAgId={sessionSummary.udose_ag_id}
            sessionId={sessionSummary.session_id}
          />
        ))}
      <Row>
        <Col md={6}>
          <CoverageAreaAndFertilizerInfo sessionSummary={sessionSummary} />
        </Col>
        <Col md={6}>
          <FertilizerAnalysis
            fertilizerAnalysis={fertilizerAnalysis}
            isErrorFertilizerAnalysis={isErrorFertilizerAnalysis}
            isFetchingFertilizerAnalysis={isFetchingFertilizerAnalysis}
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FertilizerAnalysisPerHeactarePieChart
            fertilizerAnalysisPerHectare={fertilizerAnalysis?.hectare}
          />
        </Col>

        <Col md={6}>
          <FertilizerAnalysisPerHeactarePerPlantPieChart
            fertilizerAnalysisPerHectarePerPlant={fertilizerAnalysis?.plant}
          />
        </Col>
      </Row>

      <UdoseAgMap
        deviceLocation={{
          latitude: startMessage?.latitude,
          longitude: startMessage?.longitude,
        }}
      />
    </>
  );
};

export default ViewSessionDetail;
