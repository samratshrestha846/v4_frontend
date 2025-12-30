import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { firstCharOfWords, formattedDatetime } from '../../../../../helpers';
import { Log } from '../../../../../types/log/logList';
import useFetchLogs from '../../../../../hooks/common/useFetchLogs';
import useAddNotes from './hooks/useAddNotes';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import CircleNameInitials from '../../../../../components/CircleNameInitials';

type PostProps = {
  logData: Log;
};

const Post: React.FC<PostProps> = ({ logData }) => {
  const nameInitialCharacters = (
    firstName: string,
    lastName: string
  ): string => {
    return `${firstCharOfWords(firstName)[0]}${firstCharOfWords(lastName)[0]}`.toUpperCase();
  };

  return (
    <div className="my-2 post-item">
      <div className="d-flex justify-content-start align-items-top gap-3">
        <div>
          <CircleNameInitials
            fullName={`${logData?.user?.first_name} ${logData?.user?.last_name}`}
            index={logData?.id}
            key={logData?.id}
            initialCharacters={nameInitialCharacters(
              logData?.user?.first_name,
              logData?.user?.last_name
            )}
          />
        </div>
        <div className="d-flex flex-column justify-content-start align-items-top gap-2 flex-grow-1">
          <div className="d-flex justify-content-between align-items-center gap-2 flex-grow-1">
            <h5 className="m-0 text-black-50">{`${logData?.user?.first_name} ${logData?.user?.last_name}`}</h5>
            <span className="font-12 text-slate-gray">
              {formattedDatetime(logData?.created_at)}
            </span>
          </div>
          <div>
            <p className="text-black font-14 mb-1">{logData?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  modelType: string;
  userId?: number;
};
const AddViewNotes: React.FC<Props> = ({ modelType, userId }) => {
  const { data, isFetching, isError, refetch } = useFetchLogs({
    model_type: modelType,
    model_id: String(userId),
    type: 'note',
    page_size: 3,
  });

  const logData = data?.body;

  const { onSubmit, text, setText } = useAddNotes(userId, modelType, refetch);

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card className="tilebox-one">
      <Card.Body>
        <div className="ribbon-content mb-2">
          <Row className="justify-content-md-center ">
            <Col sm={12}>
              <form onSubmit={onSubmit} className="comment-area-box ">
                <textarea
                  aria-label="Note"
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control border-2 resize-none "
                  placeholder="Write something...."
                />
                <div className="float-end mt-2">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="btn btn-secondary btn-sm">
                    <i className="bx bx-send me-1 font-18" />
                    <span>Post</span>
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            {logData?.map((noteData: Log) => (
              <Post key={noteData.id} logData={noteData} />
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AddViewNotes;
