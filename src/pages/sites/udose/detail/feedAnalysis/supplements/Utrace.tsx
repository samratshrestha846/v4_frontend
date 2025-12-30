import React, { FC } from 'react';
import { UTraceNutrition } from '../../../../../../types/supplements/supplement';

type Props = {
  breakdowns: UTraceNutrition;
};

const UTrace: FC<Props> = ({ breakdowns }) => {
  return (
    <>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-iodine" /> Iodine
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.iodine}
        </td>
      </tr>
      <tr className="mb-0">
        <td className="p-1">
          <i className="bx bxs-square text-copper" /> Copper
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.copper}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-cobalt" /> Cobalt
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.cobalt}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-selenium" /> Selenium
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.selenium}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-zinc" /> Zinc
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.zinc}
        </td>
      </tr>
      <tr>
        <td className="p-1">
          <i className="bx bxs-square text-manganese" /> Manganese
        </td>
        <td className="p-1 text-end text-secondary-color fw-semibold">
          {breakdowns?.manganese}
        </td>
      </tr>
    </>
  );
};

export default UTrace;
