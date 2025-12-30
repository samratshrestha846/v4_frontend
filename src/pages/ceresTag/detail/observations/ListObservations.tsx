import React from 'react';
import { Accordion } from 'react-bootstrap';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import { formattedShortDate } from '../../../../helpers';
import {
  CERES_TAG_BRAND_CERESRANCH,
  CERES_TAG_BRAND_CERESTRACE,
  CERES_TAG_BRAND_CERESWILD,
  CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_NEW,
  CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_OLD,
  CERES_TAG_FIRMWARE_VERSION_CERESWILD_NEW,
  CERES_TAG_FIRMWARE_VERSION_CERESWILD_OLD,
} from '../../../../constants/ceresTagConstants';
import useListObservations from '../../hooks/useListObservations';
import Pagination from '../../../../components/Pagination';
import FilterObservations from './FilterObservations';
import {
  CeresTag,
  CeresTagObservation,
  CeresTagObservationNewData,
  CeresWildObservationNewData,
} from '../../../../types/ceresTag/ceresTag';
import ObservationsTableOld from '../../components/ObservationsTableOld';
import ObservationsTableNew from '../../components/ObservationsTableNew';
import CeresWildObservationsTableNew from '../../components/CeresWildObservationsTableNew';
import useExportObservations from '../../hooks/useExportObservations';
import Loader from '../../../../components/Loader';

type Props = {
  ceresTagId: string | undefined;
  ceresTagDetail?: CeresTag;
};

const ListObservations: React.FC<Props> = ({ ceresTagId, ceresTagDetail }) => {
  const {
    data,
    isFetching,
    isError,
    observations,
    loading,
    pageNumber,
    handlePageChange,
    duration,
    handleChangeDuration,
  } = useListObservations(Number(ceresTagId));

  const { handleExportObservations, isExporting } = useExportObservations(
    duration,
    ceresTagId
  );

  if (isError) return <ErrorMessage />;

  return (
    <>
      <FilterObservations
        handleChangeDuration={handleChangeDuration}
        duration={duration}
        handleExportObservations={handleExportObservations}
      />

      {isExporting && <Loader />}

      {loading || isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <div className="mb-2">
            <Accordion defaultActiveKey="0" className="mt-1 custom-accordion">
              {observations?.map((item, itemKey) => (
                <Accordion.Item
                  key={item.date}
                  eventKey={itemKey.toString()}
                  className="mt-2">
                  <Accordion.Header className="mt-0">
                    <h5 className="txt-primary-color m-0">
                      <i className="bx bx-calendar me-1" />
                      {formattedShortDate(item.date)}
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    {(ceresTagDetail?.brand === CERES_TAG_BRAND_CERESTRACE ||
                      ceresTagDetail?.brand === CERES_TAG_BRAND_CERESRANCH) &&
                      ceresTagDetail?.firmware_version ===
                        CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_OLD && (
                        <ObservationsTableOld
                          observations={
                            item.observations as CeresTagObservation[]
                          }
                        />
                      )}

                    {(ceresTagDetail?.brand === CERES_TAG_BRAND_CERESTRACE ||
                      ceresTagDetail?.brand === CERES_TAG_BRAND_CERESRANCH) &&
                      ceresTagDetail?.firmware_version ===
                        CERES_TAG_FIRMWARE_VERSION_CERESTRACE_OR_CERESRANCH_NEW && (
                        <ObservationsTableNew
                          observations={
                            item.observations as CeresTagObservationNewData[]
                          }
                        />
                      )}

                    {ceresTagDetail?.brand === CERES_TAG_BRAND_CERESWILD &&
                      ceresTagDetail?.firmware_version ===
                        CERES_TAG_FIRMWARE_VERSION_CERESWILD_OLD && (
                        <ObservationsTableOld
                          observations={
                            item.observations as CeresTagObservation[]
                          }
                        />
                      )}

                    {ceresTagDetail?.brand === CERES_TAG_BRAND_CERESWILD &&
                      ceresTagDetail?.firmware_version ===
                        CERES_TAG_FIRMWARE_VERSION_CERESWILD_NEW && (
                        <CeresWildObservationsTableNew
                          observations={
                            item.observations as CeresWildObservationNewData[]
                          }
                        />
                      )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          <Pagination
            data={data!.meta_data!.pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default ListObservations;
