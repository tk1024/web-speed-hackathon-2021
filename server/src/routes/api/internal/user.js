import { Post, User } from '../../../models';


// router.get('/me', async (req, res) => {
//   if (req.session.userId === undefined) {
//     throw new httpErrors.Unauthorized();
//   }
//   const user = await User.findByPk(req.session.userId);

//   if (user === null) {
//     throw new httpErrors.NotFound();
//   }

//   return res.status(200).type('application/json').send(user);
// });

// router.put('/me', async (req, res) => {
//   if (req.session.userId === undefined) {
//     throw new httpErrors.Unauthorized();
//   }
//   const user = await User.findByPk(req.session.userId);

//   if (user === null) {
//     throw new httpErrors.NotFound();
//   }

//   Object.assign(user, req.body);
//   await user.save();

//   return res.status(200).type('application/json').send(user);
// });

export const getUser = async (username) => {
    return User.findOne({
        where: {
            username,
        },
    });
};

export const getUserPosts = async (username, { limit, offset }) => {
    const user = await User.findOne({
        where: {
            username,
        },
    });

    if (user === null) {
        return null
    }

    return Post.findAll({
        limit,
        offset,
        where: {
            userId: user.id,
        },
    });
};