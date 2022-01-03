import { PostItem } from '../PostItem';


/**
 * @typedef {object} Props
 * @property {Models.Post} post
 */

/** @type {React.VFC<Props>} */
const PostPage = ({ post }) => {
  return <PostItem post={post} />
};

export { PostPage };
