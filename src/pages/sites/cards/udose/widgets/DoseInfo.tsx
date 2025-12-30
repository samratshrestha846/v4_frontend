import React from 'react';
import { SiteSetting } from '../../../../../types/site';
import { DOSING_MODE } from '../../../../../constants/udoseSettings';
import IconInfoCard from '../../../../../components/IconInfoCard';

type Props = {
  settingRecord: SiteSetting | null;
};

const DoseInfo: React.FC<Props> = ({ settingRecord }) => {
  return (
    <div className="doseInfo">
      <h6 className="text-gray text-uppercase">Dose Info</h6>
      <h4 className="fw-lighter">
        {`${settingRecord?.target_dose ?? ''} mL / `}
        {`${settingRecord?.trigger_point ?? ''} L`}
      </h4>
      <IconInfoCard
        title={[
          settingRecord
            ? DOSING_MODE[settingRecord.dosing_mode]
            : 'No Dosing Info',
        ]}
        iconClass="bx bx-injection"
        iconColorClass="text-dark"
        bgClass="bg-primary-lighten"
        borderClass="border-dark"
      />
    </div>
  );
};
export default DoseInfo;
