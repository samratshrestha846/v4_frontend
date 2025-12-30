/* eslint-disable react/no-array-index-key */
// @flow
import React, { ChangeEvent, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APICore } from '../../helpers/api/apiCore';
import { formattedDate } from '../../helpers';
import { Log, LogFilterParams } from '../../types/log/logList';

type Props = {
  logData?: Log;
};

const Post = ({ logData }: Props) => {
  return (
    <div className="p-1 mt-1 border-bottom border-light">
      <div className="d-flex justify-content-between">
        <div className="d-flex ">
          <i className="bx bx-user-circle font-16 me-1" />
          <h5 className="m-0 text-black-50">{logData?.user?.first_name}</h5>
        </div>
        <p className="text-muted m-0">
          <small>{formattedDate(logData?.created_at)}</small>
        </p>
      </div>
      <div>
        <p className="text-black font-14 ps-3 mb-1">{logData?.description}</p>
      </div>
    </div>
  );
};

type AddViewNotesProps = {
  modelType: string;
  logData?: Log[];
};

const AddViewNotes: React.FC<AddViewNotesProps> = ({ modelType, logData }) => {
  const api = new APICore();
  const { id } = useParams();
  const [text, setText] = useState('');
  const [logs, setLogs] = useState(logData);

  const fetchLogs = async () => {
    const params: LogFilterParams = {
      model_type: modelType,
      model_id: id,
      type: 'note',
      limit: 3,
    };
    const response = await api.get('/logs', params);
    setLogs(response.data.body);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === '') {
      toast.error('Please write a note and try again');
    }
    const params = {
      model_type: modelType,
      model_id: id,
      type: 'note',
      description: text,
    };

    await api
      .create('/logs', params)
      .then(() => {
        toast.success('User Note created successfully');
        setText('');
        fetchLogs();
      })
      .catch((error) => {
        toast.error(error.response.data.status.message);
      });
  };

  return (
    <Col xl={12}>
      <Card className="ribbon-box">
        <Card.Header as="h5" className="text-primary-color">
          Add Note
        </Card.Header>
        <Card.Body>
          <div className="ribbon-content">
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
                      <i className="bx bx-book-add me-1" />
                      Add Note
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>

          {logs?.map((data, index) => <Post key={index} logData={data} />)}
          {logs && logs?.length > 5 && (
            <Link
              className="bx bx-file btn-link float-end mt-1"
              to={`/logs?model_type=${modelType}&model_id=${id}&type=note`}>
              View more
            </Link>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AddViewNotes;
