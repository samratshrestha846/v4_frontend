import React from 'react';
import { Modal } from 'react-bootstrap';

import CustomModalHeader from '../../../../../../components/modal/CustomModalHeader';
import UdoseRecordSettings from '../../../../../../types/udose/udoseSettings';
import { LabelNumericValue } from '../../../../../../types/common';
import { Udose } from '../../../../../../types/udose/udoseList';
import NutrientSettingsNewForm from '../forms/NutrientSettingsNewForm';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  settings?: UdoseRecordSettings;
  nutrientSelectionOptions: LabelNumericValue[];
  udoseDetail?: Udose;
  isFetchingUdose?: boolean;
  refetchUdose: () => void;
};

const NutrientSelectionModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  settings,
  nutrientSelectionOptions,
  udoseDetail,
  isFetchingUdose,
  refetchUdose,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader
          title="Nutrient Setting"
          handleModalClose={toggleModal}
        />
      </Modal.Header>
      <Modal.Body>
        <NutrientSettingsNewForm
          settings={settings}
          latestSupplement={udoseDetail?.site_supplement}
          nutrientSelectionOption={nutrientSelectionOptions}
          toggleModal={toggleModal}
          isFetchingUdose={isFetchingUdose}
          refetchUdose={refetchUdose}
        />
        <div className="mt-3">
          <figcaption className="blockquote-footer m-0">
            Note: It will take 2-5 mins to update settings in device
          </figcaption>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NutrientSelectionModal;
