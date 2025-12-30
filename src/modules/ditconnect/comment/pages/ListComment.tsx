import React from 'react';
import { Card } from 'react-bootstrap';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { can } from '@uhub/helpers/checkPermission';
import useFetchList from '../../hooks/useFetchList';
import { CommentListResponse } from '../types/Comment';
import { COMMENT, CREATE_COMMENT } from '../constants/constant';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

type ListCommentProps = {
  commentableId: number;
};

const ListComment: React.FC<ListCommentProps> = ({ commentableId }) => {
  const canCreate = can(CREATE_COMMENT);
  const { data, isFetching, isError } = useFetchList<CommentListResponse>(
    COMMENT,
    { commentable_id: commentableId }
  );

  return (
    <Card>
      <Card.Body>
        {isError && <ErrorMessage />}

        {canCreate && (
          <CommentForm
            defaultValues={{
              commentable_id: commentableId,
              comment: null,
              commentable_type: 'purchase_request',
            }}
          />
        )}

        {isFetching ? (
          <CustomLoader />
        ) : (
          <div className="comment-list">
            {data?.data?.map((item) => (
              <CommentItem comment={item} key={item.id} />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ListComment;
