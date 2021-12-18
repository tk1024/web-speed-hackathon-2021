import httpErrors from "http-errors";
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../../../server/src/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

  const user = await User.findOne({
    where: {
      username: req.query.username,
    },
  });

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).send(user);
}