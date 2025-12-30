import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment';
import EditSetting from './EditSettingModal';
import NutrientSettings from './settingsGroup/NutrientSettings';
import DoseSettings from './settingsGroup/DoseSettings';
import ConductivitySettings from './settingsGroup/ConductivitySettings';
import OtherSettings from './settingsGroup/OtherSettings';
import RemoteCommands from './settingsGroup/RemoteCommands';
import useUdoseRecordSettings from './hooks/useUdoseRecordSettings';
import CustomLoader from '../../../../../components/CustomLoader';
import SiteSettings from './SiteSettings';
import useSupplementsDropdown from '../../../../../hooks/dropdown/useSupplementsDropdown';
import useReadUdoseSite from '../../hooks/useReadUdoseSite';

const Settings: React.FC = () => {
  const {
    refetch,
    toggleEdit,
    hasEditPermission,
    settings,
    editModal,
    setEditModal,
    editModalChildren,
    setEditModalChildren,
    isFetching,
  } = useUdoseRecordSettings();

  const {
    data: nutrientSelectionOptions,
    isFetching: isFetchingNutrientSelectionOptions,
  } = useSupplementsDropdown();

  const {
    data: udoseDetail,
    isFetching: isFetchingUdose,
    refetch: refetchUdose,
  } = useReadUdoseSite();

  if (isFetching) {
    return <CustomLoader />;
  }

  return (
    <>
      {(!settings || !udoseDetail) && (
        <Col xl={12}>
          <Card.Body>
            <h5 className="text-center">
              Settings has not been updated yet. Please Fetch settings or
              contact DIT Technicians!
            </h5>
          </Card.Body>
        </Col>
      )}

      <div className="ribbon-box mt-2 site-settings">
        {settings && udoseDetail && (
          <Row>
            <Col>
              <div
                className={classNames(
                  'ribbon',
                  'ribbon-success',
                  'float-start',
                  'mb-2'
                )}>
                <i className="mdi mdi-access-point me-1" />{' '}
                {moment(settings?.message_date)
                  .local()
                  .format('ddd, Do MMM YY')}{' '}
                ( {moment(settings?.message_date).fromNow()} )
              </div>
            </Col>

            <Col>
              <div>
                <h5>
                  Firmware verison:
                  {` ${settings.telemetry_major_version}.${settings.board_firmware_month}.${settings.board_firmware_day}`}
                </h5>
              </div>
            </Col>

            <Col>
              <div className="float-end">
                <button
                  type="submit"
                  className="btn btn-primary ms-2"
                  onClick={() => refetch()}>
                  <i className="mdi mdi-autorenew" />
                </button>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          {settings && udoseDetail && (
            <>
              <Col md={6}>
                <DoseSettings
                  settings={settings}
                  toggleEdit={toggleEdit}
                  hasEditPermission={hasEditPermission}
                  setEditModalChildren={setEditModalChildren}
                />
              </Col>

              <Col md={6}>
                <ConductivitySettings
                  settings={settings}
                  toggleEdit={toggleEdit}
                  hasEditPermission={hasEditPermission}
                  setEditModalChildren={setEditModalChildren}
                />
              </Col>

              <Col md={6}>
                <NutrientSettings
                  settings={settings}
                  toggleEdit={toggleEdit}
                  hasEditPermission={hasEditPermission}
                  setEditModalChildren={setEditModalChildren}
                  nutrientSelectionOptions={nutrientSelectionOptions}
                  isFetchingNutrientSelectionOptions={
                    isFetchingNutrientSelectionOptions
                  }
                  udoseDetail={udoseDetail}
                  refetchUdose={refetchUdose}
                  isFetchingUdose={isFetchingUdose}
                />
              </Col>

              <Col md={6}>
                <OtherSettings
                  settings={settings}
                  toggleEdit={toggleEdit}
                  hasEditPermission={hasEditPermission}
                  setEditModalChildren={setEditModalChildren}
                />
              </Col>
            </>
          )}

          <Col md={6}>
            <RemoteCommands
              toggleEdit={toggleEdit}
              setEditModalChildren={setEditModalChildren}
            />
          </Col>

          <Col md={6}>
            <SiteSettings />
          </Col>
        </Row>
      </div>

      {editModal && (
        <EditSetting editModal={editModal} setEditModal={setEditModal}>
          {editModalChildren}
        </EditSetting>
      )}
    </>
  );
};

export default Settings;
