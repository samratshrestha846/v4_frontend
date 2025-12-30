import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import Collapsible from '@uhub/components/Accordion/Collapsible';

import { WORK_DIARY_LIST, WORK_DIARY_VIEW } from '../constants/constant';
import useReadWorkDiary from '../hooks/useReadWorkDiary';
import WorkDiaryInfo from './components/WorkDiaryInfo';
import TaskInfo from './components/TaskInfo';

const ViewWorkDiary: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Work Diary';
  const { data, isFetching, isError } = useReadWorkDiary(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: WORK_DIARY_LIST, active: false },
          {
            label: data?.date
              ? formattedShortDate(data.date)
              : `${title} Detail`,
            path: prepareDynamicUrl(WORK_DIARY_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Detail`}
      />
      <Card>
        <Card.Body>
          {data && (
            <>
              <WorkDiaryInfo workDiary={data} />

              {data.rnds?.length > 0 && (
                <div className="mb-2">
                  <h5 className="text-uppercase text-soft-gray">R&D Tasks</h5>
                  {data.rnds?.map((rndTask, index) => (
                    <Collapsible
                      title={`Task ${index + 1}`}
                      isDefaultOpen
                      headerBgClass="bg-success-1">
                      <TaskInfo task={rndTask} />
                    </Collapsible>
                  ))}
                </div>
              )}
              <div className="mb-2">
                <h5 className="text-uppercase text-soft-gray">Non-R&D Tasks</h5>
                <Collapsible
                  title="Task"
                  isDefaultOpen
                  headerBgClass="bg-success-1">
                  <h5 className="text-uppercase text-soft-gray">
                    {title ?? ''}
                  </h5>
                  <Row>
                    <Col sm={6} md={3}>
                      <h6 className="font-14">Hours</h6>
                      <p>{data?.non_rnd_hours ?? '-'}</p>
                    </Col>
                    <Col md={12}>
                      <h6 className="font-14">Descriptions</h6>
                      <div>
                        {data.non_rnd_description
                          ? parse(data.non_rnd_description)
                          : '-'}
                      </div>
                    </Col>
                  </Row>
                </Collapsible>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewWorkDiary;
