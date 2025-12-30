// @flow
import React, { FC } from 'react';
import { UProBlueAgolinNutrition } from '../../../../../../types/supplements/supplement';

type Props = {
  breakdowns: UProBlueAgolinNutrition;
};

const UproBlueAgolin: FC<Props> = ({ breakdowns }) => {
  return (
    <>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-phosphorus" /> DIT Trace Elements
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.dit_trace_elements}
        </td>
      </tr>
      <tr className="mb-0">
        <td className="p-1">
          <i className="bx bxs-square text-sulphur" /> Agolin
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.agolin}
        </td>
      </tr>
    </>
  );
};

export default UproBlueAgolin;
