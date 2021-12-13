import React from 'react';

import { CommentItem } from '../CommentItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Comment>} comments
 */

/** @type {React.VFC<Props>} */
const CommentList = ({
  comments
}: any) => {
  return (
    <div>
      {comments.map((comment: any) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export { CommentList };
