import React from 'react';
import { Table, Card } from 'react-bootstrap';
import Select from 'react-select';
import {
  NUTRIENT_PROBE_MODE,
  NUTRIENT_PROBE_OPTIONS,
  SETTINGS_KEY_NUTRIENT_PROBE_MODE,
  SETTINGS_KEY_NUTRIENT_TANK_CURRENT_LEVEL,
  SETTINGS_KEY_NUTRIENT_TANK_HEIGHT,
  SETTINGS_KEY_TANK_CAPACITY,
  SETTINGS_KEY_WATER_FLOW_LIMIT_PER_HR,
} from '../../../../../../constants/udoseSettings';
import SettingRow from './SettingRow';
import Input from '../../../../../../components/Form/Input';
import EditButton from '../EditButton';
import UdoseRecordSettings from '../../../../../../types/udose/udoseSettings';
import CustomLoader from '../../../../../../components/CustomLoader';
import { LabelNumericValue } from '../../../../../../types/common';
import { Udose } from '../../../../../../types/udose/udoseList';
import { Supplement } from '../../../../../../types/supplements/supplement';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';
import NutrientSelectionModal from '../modal/NutrientSelectionModal';
import SiteSupplements from '../../../../components/SiteSupplements';

type Props = {
  settings?: UdoseRecordSettings;
  toggleEdit: () => void;
  hasEditPermission: boolean;
  setEditModalChildren: any;
  nutrientSelectionOptions?: LabelNumericValue[];
  isFetchingNutrientSelectionOptions: boolean;
  udoseDetail?: Udose;
  refetchUdose: any;
  isFetchingUdose: boolean;
};

const NutrientSettings: React.FC<Props> = ({
  settings,
  toggleEdit,
  hasEditPermission,
  setEditModalChildren,
  nutrientSelectionOptions,
  isFetchingNutrientSelectionOptions,
  udoseDetail,
  refetchUdose,
  isFetchingUdose,
}) => {
  const { showModal, toggleModal } = useModalFeature();

  if (isFetchingNutrientSelectionOptions) {
    return <CustomLoader />;
  }

  return (
    <>
      <Card>
        <Card.Header as="h5" className="text-primary-color">
          Nutrient Settings
        </Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <tbody>
              <SettingRow
                editButton={
                  hasEditPermission && (
                    <EditButton
                      onClickHandler={() => {
                        toggleModal();
                      }}
                    />
                  )
                }>
                <td className="py-1"> Nutrient Selection </td>
                <td className="py-1">
                  {udoseDetail?.site_supplement ? (
                    <SiteSupplements
                      supplement={udoseDetail.site_supplement.supplement}
                      traceSupplements={
                        [
                          ...(udoseDetail?.site_supplement?.nutrients?.map(
                            (element) => element.supplement
                          ) ?? []),
                        ] as Supplement[]
                      }
                      showConcentration
                    />
                  ) : (
                    '-'
                  )}
                </td>
              </SettingRow>
              <SettingRow
                editButton={
                  hasEditPermission && (
                    <EditButton
                      onClickHandler={() => {
                        setEditModalChildren(
                          <Input
                            name={SETTINGS_KEY_TANK_CAPACITY}
                            label="Nutrient Tank Capacity"
                            defaultValue={settings?.nutrient_tank_capacity}
                          />
                        );
                        toggleEdit();
                      }}
                    />
                  )
                }>
                <td className="py-1"> Nutrient Tank Capacity </td>
                <td className="py-1"> {settings?.nutrient_tank_capacity} L </td>
              </SettingRow>

              <SettingRow
                editButton={
                  hasEditPermission && (
                    <EditButton
                      onClickHandler={() => {
                        setEditModalChildren(
                          <Input
                            name={SETTINGS_KEY_NUTRIENT_TANK_HEIGHT}
                            label="Nutrient Tank Height"
                            defaultValue={settings?.nutrient_tank_height}
                          />
                        );
                        toggleEdit();
                      }}
                    />
                  )
                }>
                <td className="py-1"> Nutrient Tank Height </td>
                <td className="py-1"> {settings?.nutrient_tank_height} mm </td>
              </SettingRow>

              <SettingRow
                editButton={
                  hasEditPermission && (
                    <EditButton
                      onClickHandler={() => {
                        setEditModalChildren(
                          <Select
                            name={SETTINGS_KEY_NUTRIENT_PROBE_MODE}
                            options={NUTRIENT_PROBE_OPTIONS}
                            defaultValue={NUTRIENT_PROBE_OPTIONS?.filter(
                              (option) =>
                                option.value === settings?.nutrient_probe_mode
                            )}
                          />
                        );
                        toggleEdit();
                      }}
                    />
                  )
                }>
                <td className="py-1"> Nutrient Probe Mode </td>
                <td className="py-1">
                  {settings &&
                    NUTRIENT_PROBE_MODE[settings.nutrient_probe_mode]}
                </td>
              </SettingRow>

              <SettingRow
                editButton={
                  hasEditPermission && (
                    <EditButton
                      onClickHandler={() => {
                        setEditModalChildren(
                          <Input
                            name={SETTINGS_KEY_NUTRIENT_TANK_CURRENT_LEVEL}
                            label="Nutrient Tank Current Level"
                            defaultValue={settings?.nutrient_tank_current_level}
                          />
                        );
                        toggleEdit();
                      }}
                    />
                  )
                }>
                <td className="py-1"> Nutrient Tank Current Level </td>
                <td className="py-1">
                  {settings?.nutrient_tank_current_level} L
                </td>
              </SettingRow>

              <SettingRow
                editButton={
                  hasEditPermission && (
                    <EditButton
                      onClickHandler={() => {
                        setEditModalChildren(
                          <Input
                            name={SETTINGS_KEY_WATER_FLOW_LIMIT_PER_HR}
                            label="1 Hour Water Flow Limit (Litres)"
                            defaultValue={
                              settings
                                ? settings.water_flow_limit_per_hr * 1000
                                : 0
                            }
                          />
                        );
                        toggleEdit();
                      }}
                    />
                  )
                }>
                <td className="py-1"> 1 Hour Water Flow Limit (Litres) </td>
                <td className="py-1">
                  {settings ? settings.water_flow_limit_per_hr * 1000 : 0} L
                </td>
              </SettingRow>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <NutrientSelectionModal
        toggleModal={toggleModal}
        showModal={showModal}
        refetchUdose={refetchUdose}
        nutrientSelectionOptions={nutrientSelectionOptions ?? []}
        settings={udoseDetail?.latest_setting}
        isFetchingUdose={isFetchingUdose}
        udoseDetail={udoseDetail}
      />
    </>
  );
};

export default NutrientSettings;
