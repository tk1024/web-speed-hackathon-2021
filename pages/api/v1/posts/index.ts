import httpErrors from 'http-errors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserJwt } from '../../../../lib/user-jwt';
import { Post } from '../../../../server/src/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const userJwt = UserJwt(req, res)
  const session = userJwt.get()

  if(req.method === "GET") {
    const posts = await Post.findAll({
      // @ts-ignore
      limit: req.query.limit,
      // @ts-ignore
      offset: req.query.offset,
    });
  
    return res.status(200).send(posts);
  }

  if(req.method === "POST") {
    if (session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
  
    const post = await Post.create(
      {
        ...req.body,
        userId: session.userId,
      },
      {
        include: [
          {
            association: 'images',
            through: { attributes: [] },
          },
          { association: 'movie' },
          { association: 'sound' },
        ],
      },
    );
  
    return res.status(200).send(post);
  }
}