import React from 'react';
import { CustomDropdownMenuItem } from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { firstCharOfWords, formattedDatetime } from '@uhub/helpers';
import CircleNameInitials from '@uhub/components/CircleNameInitials';
import useToggle from '@uhub/hooks/common/useToggle';
import { useUser } from '@uhub/hooks';
import { UPDATE_COMMENT } from '../constants/constant';
import { CommentResponse } from '../types/Comment';
import CommentForm from './CommentForm';

type CommentProps = {
  comment: CommentResponse;
};

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  const { status, toggle } = useToggle();
  const { user: loggedInUser } = useUser();

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Edit',
      icon: 'bx bx-edit',
      actionMethod: toggle,
      permission: UPDATE_COMMENT,
    },
  ];

  const findInitialCharaters = () => {
    const fullName = comment?.user?.name.split(' ');
    return firstCharOfWords(`${fullName[0]} ${fullName.pop()}`).toUpperCase();
  };

  return (
    <div className="comment-list-item">
      {status ? (
        <CommentForm
          defaultValues={{
            id: comment.id,
            comment: comment.comment,
            commentable_id: comment.commentable_id,
            commentable_type: comment.commentable_type,
          }}
          toggle={toggle}
          title="Edit Your Comment"
        />
      ) : (
        <div className="d-flex justify-content-start align-items-top gap-2">
          <div>
            <CircleNameInitials
              fullName={comment?.user?.name ?? ''}
              initialCharacters={findInitialCharaters()}
              showTooltip={false}
            />
          </div>
          <div className="d-flex flex-column justify-content-start align-items-top gap-1 flex-grow-1 bg-light p-1 comment-detail-wrapper">
            <div className="d-flex justify-content-between align-items-center gap-1 flex-grow-1">
              <h5 className="m-0 text-black-50 commenter-name">
                {comment?.user?.name ?? ''}
              </h5>
              <div className="d-flex align-items-center gap-1 flex-nowrap">
                <span className="font-12 text-slate-gray text-nowrap">
                  {comment?.created_at
                    ? formattedDatetime(comment.created_at)
                    : '-'}
                </span>
                {loggedInUser?.id === comment?.user?.id && (
                  <ActionDropdown
                    icon="bx bx-dots-vertical-rounded"
                    containerClass="custom-dropdown"
                    menuItems={menuItems}
                  />
                )}
              </div>
            </div>
            <div>
              <p className="m-0">{comment?.comment ?? '-'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
