import React from 'react';
import moment from 'moment';
import { Referrer } from '../../../../types/referrer/referrerList';
import IconLabelStatus from '../../../../components/IconLabelStatus';

type Props = {
  referrer: Referrer | undefined;
};
const ReferrerStatus: React.FC<Props> = ({ referrer }) => {
  const dateDifference = moment(referrer?.contract_expiry_date).diff(
    moment(),
    'days'
  );
  return (
    <IconLabelStatus
      label={dateDifference >= 0 ? 'Active' : 'Inactive'}
      iconClass="bx bxs-circle"
      iconTextClass={dateDifference >= 0 ? 'text-success' : 'text-light-gray'}
    />
  );
};

export default ReferrerStatus;
