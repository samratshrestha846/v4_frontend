import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Tabs, Tab } from 'react-bootstrap';
import { TabOption } from '../types/common';

type Props = {
  tabs: TabOption[];
  wrapperClass?: string;
  activeTabVariable?: string;
  // eslint-disable-next-line no-unused-vars
  extraFunction?: (val: string) => void;
};

type CustomTabTitleProps = {
  title?: any;
  iconClassName?: string;
};

const CustomTabTitle = ({ title, iconClassName }: CustomTabTitleProps) => {
  if (!title) return <span>Title</span>;

  if (
    title &&
    !iconClassName &&
    (typeof title === 'string' || typeof title === 'number')
  ) {
    return <span>{title}</span>;
  }

  return (
    <div className="d-flex justify-content-start align-items-center">
      <i className={classNames('me-1', iconClassName ?? 'bx bx-cog')} />
      <span>{title}</span>
    </div>
  );
};

const CustomTabs: React.FC<Props> = ({
  tabs,
  wrapperClass,
  activeTabVariable,
  extraFunction,
}) => {
  const [key, setKey] = useState<string>();

  useEffect(() => {
    setKey(
      activeTabVariable
        ? (localStorage.getItem(activeTabVariable) ?? tabs?.[0].eventKey)
        : tabs?.[0].eventKey
    );
  }, []);

  const handleOnSelect = (k: any) => {
    setKey(k);
    if (activeTabVariable) {
      localStorage.setItem(activeTabVariable, k);
    }
    if (extraFunction) {
      extraFunction(k);
    }
  };

  return (
    <div className={wrapperClass ?? ''}>
      <Tabs
        activeKey={key}
        onSelect={handleOnSelect}
        className="nav-bg"
        mountOnEnter>
        {tabs?.map((item) => (
          <Tab
            key={item.eventKey}
            eventKey={item.eventKey}
            title={
              <CustomTabTitle
                title={item.title}
                iconClassName={item.iconClassName}
              />
            }
            tabClassName={item.tabClassName ?? 'tab-links'}>
            {item.tabContent}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomTabs;
