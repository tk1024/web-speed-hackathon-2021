import httpErrors from "http-errors";
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserJwt } from '../../../lib/user-jwt';
import { User } from '../../../server/src/models';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const userJwt = UserJwt(req, res)

  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user === null) {
    throw new httpErrors.BadRequest();
  }

  // @ts-ignore
  if (user.validPassword(req.body.password) === false) {
    throw new httpErrors.BadRequest();
  }

  // @ts-ignore
  userJwt.set(user.id)

  return res.status(200).send(user);
}