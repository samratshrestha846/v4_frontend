import React, { FC, useState } from 'react';
import { Tabs, Tab, Card } from 'react-bootstrap';
import ListAlerts from './alerts/ListAlerts';
import ListObservations from './observations/ListObservations';
import PFISummary from './pastureFeedIntakeSummary/PFISummary';
import { CeresTag } from '../../../types/ceresTag/ceresTag';
import ListHistoricalObservations from './historicalObservations/ListHistoricalObservations';
import { CERES_TAG_BRAND_CERESRANCH } from '../../../constants/ceresTagConstants';
import ListAnimalUpdates from './animalUpdates/ListAnimalUpdates';

type Props = {
  ceresTagId?: string;
  ceresTagDetail?: CeresTag;
};

type TabTitleProps = {
  icon: string;
  text: string;
};

const TabTitle: React.FC<TabTitleProps> = ({ icon, text }) => (
  <span>
    <i className={`${icon} me-1"`} /> {text}
  </span>
);

const TagTabs: FC<Props> = ({ ceresTagId, ceresTagDetail }) => {
  const [key, setKey] = useState<string>('alerts');

  return (
    <Card>
      <Card.Body>
        <Tabs
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="nav-bg mb-2"
          mountOnEnter>
          <Tab
            eventKey="alerts"
            title={<TabTitle icon="bx bx-bell" text="Alerts" />}
            tabClassName="tab-links">
            <ListAlerts ceresTagId={ceresTagId} />
          </Tab>

          <Tab
            eventKey="observations"
            title={<TabTitle icon="bx bx-bullseye" text="Observations" />}
            tabClassName="tab-links">
            <ListObservations
              ceresTagId={ceresTagId}
              ceresTagDetail={ceresTagDetail}
            />
          </Tab>

          <Tab
            eventKey="pfi"
            title={
              <TabTitle icon="bx bx-chart" text="Pasture Feed Intake Summary" />
            }
            tabClassName="tab-links">
            <PFISummary />
          </Tab>
          {ceresTagDetail?.brand === CERES_TAG_BRAND_CERESRANCH && (
            <Tab
              eventKey="historical-observations"
              title={
                <TabTitle
                  icon="mdi mdi-clipboard"
                  text="Historical Observations"
                />
              }
              tabClassName="tab-links">
              <ListHistoricalObservations
                ceresTagId={ceresTagId}
                ceresTagDetail={ceresTagDetail}
              />
            </Tab>
          )}

          {ceresTagDetail?.brand === CERES_TAG_BRAND_CERESRANCH && (
            <Tab
              eventKey="animal-updates"
              title={<TabTitle icon="mdi mdi-cow" text="Animal Updates" />}
              tabClassName="tab-links">
              <ListAnimalUpdates data={ceresTagDetail!.animal_updates} />
            </Tab>
          )}
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default TagTabs;
