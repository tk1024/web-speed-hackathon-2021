import { useState } from 'preact/hooks';
import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { CommentList } from "../../components/post/CommentList/CommentList";
import { PostPage } from '../../components/post/PostPage';
import { Title } from '../../components/title/title';
import { NotFoundContainer } from '../NotFoundContainer';

/** @type {React.VFC} */
const PostContainer = () => {
  const { postId } = useParams();
  const [cnt, setCnt] = useState(1)
  const { data: post, isValidating: isLoading } = useSWR(`/api/v1/posts/${postId}`, (url) => fetch(url).then(res => res.json()));

  const pages = []
  for (let i = 0; i < cnt; i++) {
    pages.push(<CommentList key={i} page={i} postId={postId} />)
  }

  if (isLoading) {
    return (
      <Title>読込中 - CAwitter</Title>
    );
  }

  if (!post) {
    return <NotFoundContainer />;
  }

  return (
    <>
      <Title>{post.user.name} さんのつぶやき - CAwitter</Title>
      <InfiniteScroll fetchMore={() => setCnt(page => page + 1)}>

        <PostPage post={post} />
        {pages}
      </InfiniteScroll>
    </>
  );
};

export { PostContainer };
