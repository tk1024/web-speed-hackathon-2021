import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Post } from '../../../../../server/src/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const user = await User.findOne({
    where: {
      // @ts-ignore
      username: req.query.username,
    },
  });

  if (user === null) {
    throw new Error() // throw new httpErrors.NotFound();
  }

  const posts = await Post.findAll({
    // @ts-ignore
    limit: req.query.limit,
    // @ts-ignore
    offset: req.query.offset,
    where: {
      // @ts-ignore
      userId: user.id,
    },
  });

  return res.status(200).send(posts);
}