import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomDataTable from '../../../../../../components/CustomDataTable';
import { isEmpty } from '../../../../../../helpers';
import useAddViewNotes from './hooks/useAddViewNotes';
import CustomLoader from '../../../../../../components/CustomLoader';
import { LOGS_LIST } from '../../../../../../constants/path';
import { can } from '../../../../../../helpers/checkPermission';
import { CREATE_LOG } from '../../../../../../constants/permissions';

const AddViewNotes: React.FC = () => {
  const {
    id,
    data,
    isFetching,
    isError,
    text,
    notesTextArea,
    handleTextAreaChange,
    onSubmit,
    columns,
  } = useAddViewNotes();

  if (isError) return <CustomLoader />;

  const canCreateLog = can(CREATE_LOG);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header as="h5" className="text-primary-color">
          Site Notes
        </Card.Header>
        <Card.Body>
          {canCreateLog && (
            <>
              <div className="">
                <Row className="justify-content-md-center ">
                  <Col sm={12}>
                    <form onSubmit={onSubmit} className="comment-area-box ">
                      <textarea
                        rows={3}
                        value={text}
                        ref={notesTextArea}
                        onChange={handleTextAreaChange}
                        className="form-control border-2 resize-none "
                        placeholder="Site Maintenance, Conductivity probe cleaned, Supplement refilled etc.."
                      />
                      <p className="mb-0 text-muted character-count">
                        <small>{text.length}/250 characters</small>
                      </p>
                      <div className="float-end mt-2">
                        <button
                          type="submit"
                          className="  btn btn-sm btn-primary">
                          <i className="bx bx-list-plus me-1 font-18 " />
                          Add Note
                        </button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </div>
              <hr />
            </>
          )}

          {!isFetching && !isEmpty(data?.data) ? (
            <>
              <CustomDataTable columns={columns} data={data!.body} />
              <Link
                className="bx bx-file btn-link float-end"
                to={`/${LOGS_LIST}?model_type=site&model_id=${id}&type=note`}>
                View more
              </Link>
            </>
          ) : (
            <CustomLoader />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AddViewNotes;
