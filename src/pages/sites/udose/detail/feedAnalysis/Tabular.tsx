import React from 'react';
import { Card, Col, Collapse, Row } from 'react-bootstrap';
import classNames from 'classnames';
import { formattedShortDate } from '../../../../../helpers/dateHelper';
import { SupplementFeedAnalysisRecord } from '../../../../../types/udose/supplementFeedAnalysis';
import useTableWithExpandRows from './hooks/useTableWithExpandRows';
import CustomDataTable from '../../../../../components/CustomDataTable';
import Pagination from '../../../../../components/Pagination';
import SearchBox from '../../../../../components/SearchBox';
import CustomLoader from '../../../../../components/CustomLoader';

const expandRow = (row: SupplementFeedAnalysisRecord) => {
  return (
    <>
      <div className="d-flex justify-content-start align-items-center gap-3 mb-1">
        <h5 className="m-0"> Settings as of: </h5>
        <p className="m-0">{formattedShortDate(row?.message_date)}</p>
      </div>
      <div className="d-flex justify-content-start gap-3">
        <div className="d-flex flex-column justify-content-start gap-1">
          <div className="d-flex justify-content-start align-items-center gap-3">
            <h5 className="m-0"> Supplement Conc: </h5>
            <p className="m-0">
              {row?.udose_record_setting?.nutrient_concentration} %
            </p>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-3">
            <h5 className="m-0"> Livestock count: </h5>
            <p className="m-0">{row?.udose_record_setting?.livestock_count}</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-start gap-1">
          <div className="d-flex justify-content-start align-items-center gap-3">
            <h5 className="m-0"> Target Dose: </h5>
            <p className="m-0">{row?.udose_record_setting?.target_dose} mL</p>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-3">
            <h5 className="m-0"> Trigger Point: </h5>
            <p className="m-0">{row?.udose_record_setting?.trigger_point} L</p>
          </div>
        </div>
      </div>
    </>
  );
};

type Props = {
  breakdowns: SupplementFeedAnalysisRecord[];
  supplement: string;
};

const Tabular: React.FC<Props> = ({ breakdowns, supplement }) => {
  const {
    handlePageChange,
    handleSearchTerm,
    searchTerm,
    loading,
    pageNumber,
    dataPerPage,
    pageCount,
    pageData,
    columns,
    isOpen,
    setIsOpen,
  } = useTableWithExpandRows({ supplement, data: breakdowns, expandRow });

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="d-flex flex-column nutrient-consumption-breakdowns mb-1">
      <button
        type="button"
        className="btn btn-link btn-sm px-2 py-1 text-black flex-grow-1 d-block bg-ghost-white"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-primary-color m-0 font-16">
            Nutrient Consumption Breakdowns Per Day - {supplement}
          </h5>
          <i
            className={classNames(
              'mx-1 font-18',
              isOpen
                ? 'bx bx-chevron-down text-primary'
                : 'bx bx-chevron-right text-gray'
            )}
          />
        </div>
      </button>

      <Collapse in={isOpen}>
        <Card className="box-shadow-custom">
          <Card.Body>
            <Row className="mb-1">
              <Col md={3}>
                <SearchBox
                  search={searchTerm}
                  handleSearchOnChange={(event) => {
                    handleSearchTerm(event.target.value);
                  }}
                />
              </Col>
            </Row>

            <CustomDataTable
              columns={columns ?? []}
              data={pageData ?? []}
              tableClassName="table-sm"
              expandRow={expandRow}
            />

            <Pagination
              data={{
                from: pageData.length ? pageNumber * dataPerPage + 1 : 0,
                to: pageNumber * dataPerPage + pageData.length,
                last_page: pageCount,
                total: breakdowns.length,
              }}
              handlePageChange={handlePageChange}
              pageNumber={pageNumber}
            />
          </Card.Body>
        </Card>
      </Collapse>
    </div>
  );
};

export default Tabular;
