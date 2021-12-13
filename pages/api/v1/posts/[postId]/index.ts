import httpErrors from "http-errors";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../../../server/src/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { postId } = req.query as { postId: string }

  const post = await Post.findByPk(postId);

  if (post === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).send(post);
}