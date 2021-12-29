import { getPost, getPostComments, getPosts } from "./api/internal/post"
import { getUser, getUserPosts } from "./api/internal/user"

export const pageInitialProps = async (url) => {
    const fallback = {}

    if (url === "/") {
        const posts = await getPosts({ limit: 10, offset: 0 })
        fallback["/api/v1/posts?offset=0&limit=10"] = posts
    }

    if (url.indexOf("/posts/") === 0) {
        const postId = url.split("/")[2]
        const post = await getPost(postId)
        const comments = await getPostComments(postId, { limit: 10, offset: 0 })
        fallback[`/api/v1/posts/${postId}`] = post
        fallback[`/api/v1/posts/${postId}/comments?offset=0&limit=10`] = comments
    }

    if (url.indexOf("/users/") === 0) {
        const username = url.split("/")[2]
        const user = await getUser(username)
        const posts = await getUserPosts(username, { limit: 10, offset: 0 })
        fallback[`/api/v1/users/${username}`] = user
        fallback[`/api/v1/users/${username}/posts?offset=0&limit=10`] = posts
    }

    return fallback
}