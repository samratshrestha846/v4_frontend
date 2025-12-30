import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { can } from '@uhub/helpers/checkPermission';
import useModalFeature from '@uhub/hooks/common/useModalFeature';

import HttpApi from '../../Http/http';

import {
  PURCHASE_REQUEST,
  PURCHASE_REQUEST_STATUS_OPTIONS,
  PURCHASE_REQUEST_STATUS_PAID,
  PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED,
  UPDATE_PURCHASE_REQUEST,
} from '../constants/constant';

import AddPaymentModal from '../../payment/pages/AddPaymentModal';
import { PurchaseRequestResponse } from '../types/PurchaseRequest';
import { CREATE_PURCHASE_REQUEST_PAYMENT } from '../../payment/constants/constant';

type UpdateStatusProps = {
  purchaseRequest: PurchaseRequestResponse;
};

const UpdatePurchaseRequestStatus: React.FC<UpdateStatusProps> = ({
  purchaseRequest,
}) => {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const httpApi = new HttpApi();
  const canUpdate = can(UPDATE_PURCHASE_REQUEST);
  const canCreatePurchaseRequestPayment = can(CREATE_PURCHASE_REQUEST_PAYMENT);

  const { showModal, toggleModal } = useModalFeature();

  const handleCancel = () => {
    setEditing(false);
    toggleModal();
  };

  const updateStatusOnChange = async (selected: any) => {
    try {
      if (selected.value === PURCHASE_REQUEST_STATUS_PAID) {
        if (canCreatePurchaseRequestPayment) {
          toggleModal();
        } else {
          toast.error('Status update not allowed.');
          setEditing(false);
        }
      } else {
        const response = await httpApi.updatePatch(
          `${PURCHASE_REQUEST}/${purchaseRequest.id}`,
          {
            status: selected.value,
          }
        );
        if (response.data && response.data.data) {
          toast.success(response.data.message);
          queryClient.invalidateQueries({ queryKey: [PURCHASE_REQUEST] });
          setEditing(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error('Oops something went wrong. Please try again.');
    }
  };

  return (
    <>
      {editing ? (
        <div className="d-flex align-items-center">
          <Select
            className="w-75"
            options={PURCHASE_REQUEST_STATUS_OPTIONS}
            defaultValue={PURCHASE_REQUEST_STATUS_OPTIONS?.find(
              (item) => item.value === purchaseRequest.status
            )}
            onChange={updateStatusOnChange}
            placeholder="Select"
          />
          <i
            tabIndex={0}
            role="button"
            className="bx bx-x text-muted ms-2 font-18"
            onClick={() => setEditing(false)}
            aria-label="Close"
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {canUpdate &&
          purchaseRequest.status !==
            PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED ? (
            <div
              className="d-flex align-items-center gap-2"
              tabIndex={-1}
              role="button"
              onClick={() => setEditing(true)}
              onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}>
              <IconLabelStatus
                label={purchaseRequest.status}
                iconTextClass={
                  purchaseRequest.status ===
                  PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED
                    ? 'text-success'
                    : 'text-light-gray'
                }
              />
              <i className="bx bx-edit text-muted font-18" />
            </div>
          ) : (
            <IconLabelStatus
              label={purchaseRequest.status}
              iconTextClass={
                purchaseRequest.status ===
                PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED
                  ? 'text-success'
                  : 'text-light-gray'
              }
            />
          )}
        </>
      )}
      <AddPaymentModal
        showModal={showModal}
        toggleModal={handleCancel}
        purchaseRequestId={purchaseRequest.id}
        purchaseRequestNo={purchaseRequest.pr_no}
      />
    </>
  );
};

export default UpdatePurchaseRequestStatus;
