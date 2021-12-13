import React from 'react';

import { CommentList } from '../CommentList';
import { PostItem } from '../PostItem';

interface Props {
  comments: any
  post: any
}

/** @type {React.VFC<Props>} */
const PostPage = ({ comments, post }: Props) => {
  return (
    <>
      <PostItem post={post} />
      <CommentList comments={comments} />
    </>
  );
};

export { PostPage };
