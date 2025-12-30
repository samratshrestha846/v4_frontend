import React, { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  editButton?: ReactNode;
};

const SettingRow: FC<Props> = ({ children, editButton }) => {
  return (
    <tr>
      {children}
      <td className="py-1">{editButton}</td>
    </tr>
  );
};

export default SettingRow;
