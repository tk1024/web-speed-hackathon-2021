import type { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '../../../../../server/src/models';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {
    limit,
    offset,
    postId
  } = req.query as {
    limit: string
    offset: string
    postId: string
  }

  const posts = await Comment.findAll({
    limit: Number(limit),
    offset: Number(offset),
    where: {
      // @ts-ignore
      postId,
    },
  });

  return res.status(200).send(posts);
}