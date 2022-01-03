import { useState } from 'preact/hooks';
import { useRoute } from 'wouter-preact';
import useSWR from 'swr';
import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { CommentList } from "../../components/post/CommentList/CommentList";
import { PostPage } from '../../components/post/PostPage';
import { Title } from '../../components/title/title';
import { NotFoundContainer } from '../NotFoundContainer';

/** @type {React.VFC} */
const PostContainer = () => {
  const [match, params] = useRoute("/posts/:postId");
  const postId = params.postId
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
