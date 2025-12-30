import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomModalHeader from '../../../components/modal/CustomModalHeader';
import CustomDataTable from '../../../components/CustomDataTable';
import { Log } from '../../../types/log/logList';
import { TableColumn } from '../../../types/common';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  value?: Log;
};

const LogDetailModal: React.FC<Props> = ({ showModal, toggleModal, value }) => {
  const newValueColumFormatter = () => {
    return (
      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
        {JSON.stringify(value!.new_value, null, 2)}
      </pre>
    );
  };

  const oldValueColumFormatter = () => {
    return (
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
        }}>
        {JSON.stringify(value!.old_value, null, 2)}
      </pre>
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'new_value',
      text: 'New Value',
      formatter: newValueColumFormatter,
    },
    {
      dataField: 'old_value',
      text: 'Old Value',
      formatter: oldValueColumFormatter,
    },
  ];
  return (
    <Modal
      size={value!.old_value ? 'xl' : 'lg'}
      show={showModal}
      onHide={toggleModal}
      dialogClassName="custom-modal">
      <Modal.Header>
        <CustomModalHeader title="Log Detail" handleModalClose={toggleModal} />
      </Modal.Header>
      <Modal.Body>
        <CustomDataTable
          columns={columns}
          data={[{ new_value: value!.new_value, old_value: value!.old_value }]}
        />
      </Modal.Body>
    </Modal>
  );
};

export default LogDetailModal;
