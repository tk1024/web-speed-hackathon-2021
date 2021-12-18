import httpErrors from "http-errors";
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserJwt } from '../../../lib/user-jwt';
import { User } from '../../../server/src/models';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const userJwt = UserJwt(req, res)
  const session = userJwt.get()

  if (req.method === "GET") {
    if (session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
    const user = await User.findByPk(session.userId);

    if (user === null) {
      throw new httpErrors.NotFound();
    }

    return res.status(200).send(user);
  }

  if (req.method === "PUT") {
    if (session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
    const user = await User.findByPk(session.userId);

    if (user === null) {
      throw new httpErrors.NotFound();
    }

    Object.assign(user, req.body);
    await user.save();

    return res.status(200).send(user);
  }

}