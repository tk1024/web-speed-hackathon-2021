import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PostContainer from "../../client/src/containers/PostContainer"

const PostPage: NextPage = () => {
  const router = useRouter()
  const { postId } = router.query as { postId: string }

  if(!postId) {
    return null
  }

  return (
    <PostContainer postId={postId} />
  )
}

export default PostPage
