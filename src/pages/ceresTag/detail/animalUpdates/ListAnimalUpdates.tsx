/* eslint-disable no-unused-vars */
import React from 'react';
import CustomDataTable from '../../../../components/CustomDataTable';

import { formattedDatetime } from '../../../../helpers';
import { CeresTagAnimalUpdate } from '../../../../types/ceresTag/ceresTag';

type Props = {
  data: CeresTagAnimalUpdate[];
};

const ListAnimalUpdates: React.FC<Props> = ({ data }) => {
  const columns = [
    {
      dataField: 'animal_tag_taken_off_at',
      text: 'Tag Taken Off At',
      formatter: (row: CeresTagAnimalUpdate) =>
        formattedDatetime(row.animal_tag_taken_off_at),
    },

    {
      dataField: 'animal_tag_put_on_at',
      text: 'Tag Put On At',
      formatter: (row: CeresTagAnimalUpdate) =>
        formattedDatetime(row.animal_tag_put_on_at),
    },
  ];

  return <CustomDataTable columns={columns} data={data} />;
};

export default ListAnimalUpdates;
