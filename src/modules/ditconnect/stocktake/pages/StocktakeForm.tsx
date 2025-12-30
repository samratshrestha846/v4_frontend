/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import Loader from '@uhub/components/Loader';
import { LabelNumericValue } from '@uhub/types/common';

import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../constants/editorConstants';
import { StocktakeFormProps } from '../types/Stocktake';
import useStocktakeForm from '../hooks/useStocktakeForm';
import useFetchList from '../../hooks/useFetchList';
import {
  SupplementInventoryListResponse,
  SupplementInventoryResponse,
} from '../../stock-availability/supplement-inventory/types/SupplementInventory';
import {
  DROPDOWN_SUPPLEMENT,
  DROPDOWN_SUPPLEMENT_INENTORY,
} from '../../constants/apiUrls';
import AvailableStocktakeItemForm from './AvailableStocktakeItemForm';
import NotFoundStocktakeItemForm from './NotFoundStocktakeItemForm';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import useDropDown from '../../hooks/useDropDown';

type Props = {
  defaultValues: StocktakeFormProps;
};
const StocktakeForm: React.FC<Props> = ({ defaultValues }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
    setValue,
    addItem,
    removeItem,
    notFoundItemFields,
    watchedLocationId,
    availableItemFields,
    appendAvailableItem,
    removeAvailableItem,
  } = useStocktakeForm(defaultValues);

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();

  const {
    data: supplementInventories,
    isFetching: isFetchingSupplementInventories,
    isError: isErrorSupplementInventories,
  } = useFetchList<SupplementInventoryListResponse>(
    DROPDOWN_SUPPLEMENT_INENTORY,
    {
      location_id: watchedLocationId,
      storage_tank_id: '',
    }
  );

  const transformSupplementOptions = (data: SupplementInventoryResponse[]) => {
    return data?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
      slug: item?.slug,
    }));
  };

  const {
    data: supplmentOptions,
    isFetching: isFetchingSupplementOptions,
    isError: isErrorSupplementOptions,
  } = useDropDown<LabelNumericValue[]>(
    DROPDOWN_SUPPLEMENT,
    transformSupplementOptions
  );

  useEffect(() => {
    if (
      defaultValues?.location_id !== watchedLocationId &&
      watchedLocationId &&
      supplementInventories?.data
    ) {
      removeAvailableItem();
      supplementInventories?.data?.forEach((item) =>
        appendAvailableItem({
          id: null,
          supplement_id: item.supplement_id,
          supplement_name: item.supplement_name,
          batch_no: item.batch_number,
          available_qty: item.current_qty,
          new_qty: item.current_qty,
          notes: null,
        })
      );
    }
  }, [supplementInventories, watchedLocationId, defaultValues]);

  if (isFetchingLocationOptions || isFetchingSupplementOptions)
    return <CustomLoader />;

  if (
    isErrorLocationOptions ||
    isErrorSupplementInventories ||
    isErrorSupplementOptions
  )
    return <ErrorMessage />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      {watchedLocationId && isFetchingSupplementInventories && <Loader />}

      <Row>
        <Col sm={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Location"
              name="location_id"
              errors={errors}
              control={control}
              options={locationOptions ?? []}
              placeholder="Select"
              defaultSelected={locationOptions?.find(
                (item: any) => item.value === defaultValues?.location_id
              )}
            />
          </div>
        </Col>

        <Col sm={6} md={6}>
          <div className="mb-2">
            <CustomDatePicker
              label="Date"
              name="date"
              control={control}
              errors={errors}
              defaultSelected={defaultValues?.date}
              maxDate={new Date()}
            />
          </div>
        </Col>
      </Row>
      <AvailableStocktakeItemForm
        control={control}
        register={register}
        errors={errors}
        itemFields={availableItemFields}
      />
      <NotFoundStocktakeItemForm
        control={control}
        register={register}
        errors={errors}
        itemFields={notFoundItemFields}
        addItem={addItem}
        removeItem={removeItem}
        supplmentOptions={supplmentOptions ?? []}
        setValue={setValue}
      />

      <Col md={12}>
        <Form.Label>Notes </Form.Label>
        <div className="mb-2">
          <JoditEditor
            config={JODIT_TEXT_EDITOR_CONFIG}
            value={defaultValues?.notes ?? ''}
            onChange={(value) => {
              setValue('notes', value ?? '');
            }}
          />
        </div>
      </Col>

      <Row>
        <Col>
          <div className="float-end button-list">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default StocktakeForm;
