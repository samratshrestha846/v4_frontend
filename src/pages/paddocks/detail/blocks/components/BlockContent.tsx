import React from 'react';
import BlockInfo from './BlockInfo';
import ListSubBlocks from '../../subBlocks/ListSubBlocks';
import useListSubBlocksByBlock from '../../subBlocks/hooks/useListSubBlocksByBlock';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import { Block } from '../../../../../types/horticulture/block';

type Props = {
  blockDetail?: Block;
};

const BlockContent: React.FC<Props> = ({ blockDetail }) => {
  const {
    data: subBlocks,
    isFetching,
    isError,
    refetch: refetchSubBlocks,
  } = useListSubBlocksByBlock(blockDetail?.id);

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <BlockInfo blockDetail={blockDetail} subBlocks={subBlocks} />
      {subBlocks && subBlocks.length > 0 && (
        <ListSubBlocks
          subBlocks={subBlocks}
          refetchSubBlocks={refetchSubBlocks}
        />
      )}
    </>
  );
};

export default BlockContent;
