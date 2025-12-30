// @flow
import React from 'react';
import classNames from 'classnames';

type Props = {
  tag?: React.ElementType;
  className?: string;
  size?: 'lg' | 'md' | 'sm';
  type?: 'bordered' | 'grow';
  color?: string;
  children?: React.ReactNode;
};

/**
 * Spinner
 */
const Spinner: React.FC<Props> = ({
  children = null,
  tag: Tag = 'div',
  color = 'secondary',
  size = '',
  className,
  type = 'bordered',
}) => {
  return (
    <Tag
      role="status"
      className={classNames(
        {
          'spinner-border': type === 'bordered',
          'spinner-grow': type === 'grow',
        },
        [`text-${color}`],
        { [`avatar-${size}|`]: size },
        className
      )}>
      {children}
    </Tag>
  );
};

export default Spinner;
