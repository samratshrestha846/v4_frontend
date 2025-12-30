import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Alert } from 'react-bootstrap';
import { formattedDate } from '../../../helpers/dateHelper';
import { Site } from '../../../types/site';
import { UbotSite } from '../../../types/ubot';

type Props = { ubotDetail?: Site | UbotSite };

const UbotCommunicationMessage: React.FC<Props> = ({ ubotDetail }) => {
  const [variant, setVariant] = useState<string>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const { textVariant, textMessage } = getMessageAndTextVariant();
    setVariant(textVariant);
    setMessage(textMessage);
  }, [ubotDetail]);

  const getMessageAndTextVariant = useMemo(() => {
    return () => {
      let textColor = 'warning';
      let textMessage = 'Data has not received in last 24 hours';

      if (ubotDetail?.communicated_at) {
        const isCommunicatedInLastTwentyFourHours = moment
          .utc(ubotDetail.communicated_at)
          .local()
          .isAfter(moment().subtract(24, 'hours'));

        if (isCommunicatedInLastTwentyFourHours) {
          textColor = 'success';
          textMessage = 'Data is receiving';
        }
      }

      return { textVariant: textColor, textMessage };
    };
  }, []);

  return (
    <Alert variant={variant} className="mb-1">
      <p className={`text-${variant} mb-0`}>
        {`${message}, Last seen ${ubotDetail?.communicated_at && formattedDate(ubotDetail.communicated_at)}`}
      </p>
    </Alert>
  );
};

export default UbotCommunicationMessage;
