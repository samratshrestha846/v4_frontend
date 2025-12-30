/* eslint-disable no-unused-vars */
import React from 'react';
import { SubBlock } from '../../../../../types/horticulture/subBlock';
import CustomDataTable from '../../../../../components/CustomDataTable';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import useListSubBlockPlantationHistory from './hooks/useListSubBlockPlantationHistory';

type Props = {
  subBlockDetail?: SubBlock;
};
const ListSubBlockPlantationHistory: React.FC<Props> = ({ subBlockDetail }) => {
  const { data, isFetching, isError } = useListSubBlockPlantationHistory(
    subBlockDetail?.id
  );

  const columns = [
    {
      dataField: 'crop.name',
      text: 'Crop Name',
    },
    {
      dataField: 'date_from',
      text: 'Started On',
    },
    {
      dataField: 'date_to',
      text: 'Ended On',
    },
    {
      dataField: 'number_of_plants',
      text: 'No. of Plants',
    },
  ];

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return <CustomDataTable columns={columns} data={data!.body} />;
};

export default ListSubBlockPlantationHistory;
