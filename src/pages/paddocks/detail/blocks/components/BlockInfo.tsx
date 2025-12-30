import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Block } from '../../../../../types/horticulture/block';
import { formattedShortDate } from '../../../../../helpers';
import { SubBlock } from '../../../../../types/horticulture/subBlock';

type Props = {
  blockDetail?: Block;
  subBlocks?: SubBlock[];
};

const BlockInfo: React.FC<Props> = ({ blockDetail, subBlocks }) => {
  const remainingArea = useMemo(() => {
    if (subBlocks && blockDetail) {
      let totalSum = 0;
      subBlocks.forEach((item) => {
        totalSum += item.area_in_hectares;
      });
      return blockDetail.area_in_hectares - totalSum;
    }
    return 0;
  }, [blockDetail, subBlocks]);

  return (
    <div className="block-item p-2">
      <Row>
        <Col sm={6} md={3}>
          <h6 className="font-14">Area in Hectares</h6>
          <p className="text-sm lh-150">
            {blockDetail?.area_in_hectares ?? '-'}
          </p>
        </Col>

        {subBlocks && subBlocks.length > 0 && (
          <Col sm={6} md={3}>
            <h6 className="font-14">Remaining Area</h6>
            <p className="text-sm lh-150">{remainingArea ?? '-'}</p>
          </Col>
        )}

        <Col sm={6} md={3}>
          <h6 className="font-14">Crop Name</h6>
          <p className="text-sm lh-150">
            {blockDetail?.cropable?.crop?.name ?? '-'}
          </p>
        </Col>

        <Col sm={6} md={3}>
          <h6 className="font-14">Crop Stage</h6>
          <p className="text-sm lh-150">
            {blockDetail?.crop_life_cycle_stage?.crop_stage_name ?? '-'}
          </p>
        </Col>

        <Col sm={6} md={3}>
          <h6 className="font-14">Started On</h6>
          <p className="text-sm lh-150">
            {blockDetail?.cropable?.date_from
              ? formattedShortDate(blockDetail?.cropable?.date_from)
              : '-'}
          </p>
        </Col>

        <Col sm={6} md={3}>
          <h6 className="font-14">No. of Plants</h6>
          <p className="text-sm lh-150">
            {blockDetail?.cropable?.number_of_plants ?? '-'}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default BlockInfo;
