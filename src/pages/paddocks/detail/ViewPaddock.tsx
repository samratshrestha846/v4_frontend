import React from 'react';
import { useParams } from 'react-router-dom';
import PaddockInfo from '../components/PaddockInfo';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import PageTitle from '../../../components/PageTitle';
import { PADDOCK_LIST, PADDOCK_VIEW } from '../../../constants/path';
import { prepareDynamicUrl } from '../../../helpers';
import ListBlocks from './blocks/ListBlocks';

import usePreparePaddockViewData from './blocks/hooks/usePreparePaddockViewData';

const ViewPaddock: React.FC = () => {
  const { id } = useParams();

  const { paddock, isError, isFetching, numberOfBlocks, setNumberOfBlocks } =
    usePreparePaddockViewData(Number(id));

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Paddocks',
            path: PADDOCK_LIST,
          },
          {
            label: paddock?.name ?? 'View Paddock',
            path: prepareDynamicUrl(PADDOCK_VIEW, paddock?.id),
            active: true,
          },
        ]}
        title="Paddock"
      />
      <PaddockInfo paddock={paddock} numberOfBlocks={numberOfBlocks} />

      <ListBlocks setNumberOfBlocks={setNumberOfBlocks} />
    </>
  );
};

export default ViewPaddock;
