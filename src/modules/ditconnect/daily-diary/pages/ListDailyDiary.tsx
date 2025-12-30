import React from 'react';
import PageTitle from '@uhub/components/PageTitle';
import CustomTabs from '@uhub/components/CustomTabs';
import { TabOption } from '@uhub/types/common';
import { can } from '@uhub/helpers/checkPermission';
import AddNewRecord from '@uhub/components/AddNewRecord';
import useAuth from '@uhub/hooks/useAuth';
import ListWorkDiary from '../work-diary/pages/ListWorkDiary';
import {
  CREATE_WORK_DIARY,
  WORK_DIARY_ADD,
  WORK_DIARY_LIST,
} from '../work-diary/constants/constant';
import ListTravelDiary from '../travel-diary/pages/ListTravelDiary';
import { DIT_CONNECT_DAILY_DIARY_ACTIVE_TAB } from '../constants/constant';
import ListWorkDiarySummary from '../work-diary-summary/pages/ListWorkDiarySummary';

const ListDailyDiary: React.FC = () => {
  const title: string = 'Daily Diary';
  const canCreateWorkDiary = can(CREATE_WORK_DIARY);
  const createPath = WORK_DIARY_ADD;

  const { isSuperAdmin } = useAuth();

  const diaryTabs: TabOption[] = [
    {
      eventKey: 'work-dairy',
      title: 'Work Diary',
      tabContent: <ListWorkDiary />,
      iconClassName: 'bx bx-notepad',
    },
    {
      eventKey: 'travel-dairy',
      title: 'Travel Diary',
      tabContent: <ListTravelDiary />,
      iconClassName: 'bx bx-notepad',
    },
  ];

  if (isSuperAdmin) {
    diaryTabs.push({
      eventKey: 'work-dairy-summary',
      title: 'Work Diary Summary',
      tabContent: <ListWorkDiarySummary />,
      iconClassName: 'bx bx-notepad',
    });
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: WORK_DIARY_LIST,
            active: true,
          },
        ]}
        title={title}
      />

      <div className="float-end">
        {canCreateWorkDiary && createPath && (
          <AddNewRecord url={createPath} title={`Add ${title}`} />
        )}
      </div>

      <CustomTabs
        tabs={diaryTabs}
        activeTabVariable={DIT_CONNECT_DAILY_DIARY_ACTIVE_TAB}
      />
    </>
  );
};

export default ListDailyDiary;
