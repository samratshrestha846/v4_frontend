import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar, Badge, Card } from 'react-bootstrap';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Lft from 'leaflet';
import classNames from 'classnames';
import { formattedDatetime, prepareDynamicUrl } from '../../../../helpers';

import stoppedIcon from '../../../../assets/icons/stopped.svg';
import alarmedIcon from '../../../../assets/icons/alarmed.svg';
import runningIcon from '../../../../assets/icons/running.svg';
import {
  DOSER_ALARMED,
  DOSER_RUNNING,
  DOSER_STOPPED,
} from '../../../../constants/mapConstant';
import { UDOSE_VIEW } from '../../../../constants/path';

type Props = {
  marker: any;
  markerRefs?: React.MutableRefObject<any[]>;
};

type PopUpProps = {
  marker: any;
};

const CustomMarkerPopup: FC<PopUpProps> = ({ marker }) => {
  const getDoserStatusClassName = (status: string) => {
    switch (status) {
      case DOSER_RUNNING:
        return 'badge-outline-success';
      case DOSER_STOPPED:
        return 'badge-outline-danger';
      case DOSER_ALARMED:
        return 'badge-outline-warning';
      default:
        return 'badge-outline-warning';
    }
  };

  return (
    <Card>
      <Card.Body className="p-2">
        <div className="doser-custom-pop-up">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-half mb-1">
            <Link
              className="link-primary"
              to={prepareDynamicUrl(UDOSE_VIEW, marker.site_id)}
              target="_blank">
              <h5 className="m-0 text-truncate">{marker?.name}</h5>
            </Link>
            <Badge
              className={classNames(
                'badge',
                getDoserStatusClassName(marker?.status)
              )}>
              {marker?.status}
            </Badge>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2 mb-1">
            <span>Nutrient tank level</span>
            <div className="flex-grow-1">
              <ProgressBar
                className="doser-progress-bar"
                now={
                  marker?.tank_level_percent ? marker?.tank_level_percent : 0
                }
                label={`${
                  marker?.tank_level_percent ? marker?.tank_level_percent : 0
                } %`}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap  justify-content-between align-items-center mb-1">
            <div className="d-flex  justify-content-center align-items-center">
              <div className="flex-shrink-0">
                <span>
                  Average Flow
                  <br />
                  <small className="font-10">(last 7 days)</small>
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-1">
              <div className="d-flex justify-content-center align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-xs rounded">
                    <span className="avatar-title bg-info-lighten text-info  border border-info rounded-circle  my-0">
                      <i className="bx bx-water" />
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1 ms-1">
                  <span className={classNames('fw-bold  me-1')}>
                    {marker?.average_water_flow
                      ? `${marker?.average_water_flow} L`
                      : '0 L'}
                  </span>
                </div>
              </div>

              <div className="d-flex  justify-content-center align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-xs rounded">
                    <span className="avatar-title bg-warning-lighten text-warning  border border-warning rounded-circle  my-0">
                      <i className="bx bx-droplet" />
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1 ms-1">
                  <span className={classNames('fw-bold me-1 ')}>
                    {marker?.average_nutrient_flow
                      ? `${marker?.average_nutrient_flow} mL`
                      : '0 mL'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-2 mb-1">
            <span>Last Communicated</span>
            <span className="fw-bold me-1">
              {formattedDatetime(marker?.last_communicated)}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const DoserMarker: FC<Props> = ({ marker, markerRefs }) => {
  const runningleafletIcon = new Lft.Icon({
    iconUrl: runningIcon,
    iconSize: [30, 30],
  });
  const stoppedLeafletIcon = new Lft.Icon({
    iconUrl: stoppedIcon,
    iconSize: [30, 30],
  });
  const alarmedLeafletIcon = new Lft.Icon({
    iconUrl: alarmedIcon,
    iconSize: [30, 30],
  });

  const getMarkerIcon = () => {
    switch (marker.status) {
      case DOSER_RUNNING:
        return runningleafletIcon;
      case DOSER_STOPPED:
        return stoppedLeafletIcon;
      case DOSER_ALARMED:
        return alarmedLeafletIcon;
      default:
        return alarmedLeafletIcon;
    }
  };

  const setMarkerRef = (index: any) => (el: any) => {
    if (markerRefs) {
      markerRefs.current[index] = el;
    }
  };

  return (
    <Marker
      key={marker.site_id}
      position={[marker?.latitude, marker?.longitude]}
      ref={setMarkerRef(marker.site_id)}
      icon={getMarkerIcon()}>
      <Popup className=" border-1">
        <CustomMarkerPopup marker={marker} />
      </Popup>
      <Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
        <h5 className="text-primary m-0">{marker?.name}</h5>
      </Tooltip>
    </Marker>
  );
};

export default DoserMarker;
