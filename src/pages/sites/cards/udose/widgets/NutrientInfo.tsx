import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { SiteSetting } from '../../../../../types/site';
import { UdoseRecordFourHour } from '../../../../../types/udose/udoseSummary';
import { UdoseSiteSupplement } from '../../../../../types/udose/udoseSettings';
import IconInfoCard from '../../../../../components/IconInfoCard';

type Props = {
  settingRecord: SiteSetting | null;
  fourHourRecord: UdoseRecordFourHour | null;
  siteSupplement: UdoseSiteSupplement | null;
};

const NutrientInfo: React.FC<Props> = ({
  settingRecord,
  fourHourRecord,
  siteSupplement,
}) => {
  let nutrientLevelPercentageValue = 0;

  if (fourHourRecord && settingRecord) {
    nutrientLevelPercentageValue = Math.round(
      (fourHourRecord.nutrient_tank_level /
        settingRecord.nutrient_tank_capacity) *
        100
    );
  }

  return (
    <div className="nutrientInfo">
      <h6 className="text-gray text-uppercase">Nutrient Info</h6>
      <ProgressBar
        className="mt-3"
        now={nutrientLevelPercentageValue}
        label={`${nutrientLevelPercentageValue} %`}
      />
      <div className="d-flex  flex-column justify-content-between align-items-start gap-2 mt-3 mb-2">
        {/* Tank level info */}
        <IconInfoCard
          title={[
            fourHourRecord
              ? `${fourHourRecord.nutrient_tank_level} L`
              : 'No Tank Level Record',
          ]}
          borderClass="border-info"
          bgClass="bg-info-lighten"
          iconClass="bx bx-water"
          iconColorClass="text-info"
        />

        {/* Supplement info */}
        <IconInfoCard
          title={[
            siteSupplement?.supplement?.standard_concentration
              ? `${siteSupplement?.supplement?.name} - ${siteSupplement?.supplement?.standard_concentration}%`
              : siteSupplement?.supplement?.name ?? 'No Nutrient Record',
          ]}
          borderClass="border-warning"
          bgClass="bg-warning-lighten"
          iconClass="bx bxs-droplet"
          iconColorClass="text-warning"
        />

        {/* Trace supplement info */}
        {siteSupplement && siteSupplement?.nutrients?.length > 0 && (
          <IconInfoCard
            title={
              siteSupplement?.nutrients?.map((traceSupplement) =>
                traceSupplement?.supplement?.standard_concentration
                  ? `${traceSupplement?.supplement?.name} - ${traceSupplement?.supplement?.standard_concentration}%`
                  : traceSupplement?.supplement?.name ?? 'No Nutrient Record'
              ) ?? []
            }
            borderClass="border-warning"
            bgClass="bg-warning-lighten"
            iconClass="bx bxs-droplet-half"
            iconColorClass="text-warning"
          />
        )}

        {/* Cattle count info */}
        <IconInfoCard
          title={[
            settingRecord
              ? `${settingRecord.livestock_count} Head`
              : 'No Livestock Record',
          ]}
          borderClass="border-success"
          bgClass="bg-success-lighten"
          iconClass="bx bxl-baidu"
          iconColorClass="text-success"
        />
      </div>
    </div>
  );
};
export default NutrientInfo;
