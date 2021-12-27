import React from 'react';
import useSWR from "swr";
import { CommentItem } from '../CommentItem';


/**
 * @typedef {object} Props
 * @property {number} page
 * @property {string} postId
 */

/** @type {React.VFC<Props>} */
const CommentList = ({ postId, page }) => {
  const { data: comments } = useSWR(`/api/v1/posts/${postId}/comments?offset=${10 * page}&limit=10`, (url) => fetch(url).then(res => res.json()))

  if (!comments) {
    return null
  }

  return (
    <div>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export { CommentList };
