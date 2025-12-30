import React, { FC } from 'react';
import { UProMulgaNutrition } from '../../../../../../types/supplements/supplement';

type Props = {
  breakdowns: UProMulgaNutrition;
};

const UproMulga: FC<Props> = ({ breakdowns }) => {
  return (
    <>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-phosphorus" /> Phosphorus
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.phosphorus}
        </td>
      </tr>
      <tr className="mb-0">
        <td className="p-1">
          <i className="bx bxs-square text-sulphur" /> Sulphur
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.sulphur}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-nitrogen" /> Nitrogen
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.nitrogen}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-crude-protein" /> Crude Protein
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.crude_protein}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-urea-equivalent" /> Urea Equivalent
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.urea_equivalent}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-peg" /> Polyethylenelycol (PEG)
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.PEG} mL
        </td>
      </tr>
    </>
  );
};

export default UproMulga;
