import { getPost, getPostComments, getPosts } from "./api/internal/post"
import { getUser, getUserPosts } from "./api/internal/user"

const cache = {}

export const pageInitialProps = async (url) => {
    const fallback = {}

    fallback["/api/v1/me"] = null

    if (url.replace("index.html", "") === "/") {
        getPosts({ limit: 10, offset: 0 }).then(posts => cache["/api/v1/posts?offset=0&limit=10"] = posts);
        ["/api/v1/posts?offset=0&limit=10"].forEach(key => {
            if (cache[key]) {
                fallback[key] = cache[key]
            }
        })
    }

    if (url.indexOf("/posts/") === 0) {
        const postId = url.split("/")[2]
        getPost(postId).then(post => cache[`/api/v1/posts/${postId}`] = post);
        getPostComments(postId, { limit: 10, offset: 0 }).then(comments => cache[`/api/v1/posts/${postId}/comments?offset=0&limit=10`] = comments);
        [`/api/v1/posts/${postId}`, `/api/v1/posts/${postId}/comments?offset=0&limit=10`].forEach(key => {
            if (cache[key]) {
                fallback[key] = cache[key]
            }
        })
    }

    if (url.indexOf("/users/") === 0) {
        const username = url.split("/")[2]
        getUser(username).then(user => cache[`/api/v1/users/${username}`] = user);
        getUserPosts(username, { limit: 10, offset: 0 }).then(posts => cache[`/api/v1/users/${username}/posts?offset=0&limit=10`] = posts);
        [`/api/v1/users/${username}`, `/api/v1/users/${username}/posts?offset=0&limit=10`].forEach(key => {
            if (cache[key]) {
                fallback[key] = cache[key]
            }
        })
    }

    return fallback
}