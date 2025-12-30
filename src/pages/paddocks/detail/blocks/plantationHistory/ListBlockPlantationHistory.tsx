/* eslint-disable no-unused-vars */
import React from 'react';
import CustomDataTable from '../../../../../components/CustomDataTable';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import { Block } from '../../../../../types/horticulture/block';
import useListBlockPlantationHistory from './hooks/useListBlockPlantationHistory';

type Props = {
  blockDetail?: Block;
};
const ListBlockPlantationHistory: React.FC<Props> = ({ blockDetail }) => {
  const { data, isFetching, isError } = useListBlockPlantationHistory(
    blockDetail?.id
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

export default ListBlockPlantationHistory;
