import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { User } from '../../models';
import { getUser, getUserPosts } from './internal/user';


const router = Router();

router.get('/me', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  const user = await User.findByPk(req.session.userId);

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(user);
});

router.put('/me', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  const user = await User.findByPk(req.session.userId);

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  Object.assign(user, req.body);
  await user.save();

  return res.status(200).type('application/json').send(user);
});

router.get('/users/:username', async (req, res) => {
  const user = await getUser(req.params.username)
  
  if (user === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(user);
});

router.get('/users/:username/posts', async (req, res) => {
  const posts = await getUserPosts(req.params.username, {
    limit: req.query.limit,
    offset: req.query.offset,
  })

  if (posts === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(posts);
});

export { router as userRouter };
