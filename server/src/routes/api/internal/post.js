import { Comment, Post } from '../../../models';


export const getPosts = async ({ limit, offset }) => {
    return Post.findAll({
        limit,
        offset,
    });
}

export const getPost = async (postId) => {
    return Post.findByPk(postId);
}

export const getPostComments = async (postId, { limit, offset }) => {
    return Comment.findAll({
        limit,
        offset,
        where: {
            postId,
        },
    });
};

// router.post('/posts', async (req, res) => {
//     if (req.session.userId === undefined) {
//         throw new httpErrors.Unauthorized();
//     }

//     const post = await Post.create(
//         {
//             ...req.body,
//             userId: req.session.userId,
//         },
//         {
//             include: [
//                 {
//                     association: 'images',
//                     through: { attributes: [] },
//                 },
//                 { association: 'movie' },
//                 { association: 'sound' },
//             ],
//         },
//     );

//     return res.status(200).type('application/json').send(post);
// });