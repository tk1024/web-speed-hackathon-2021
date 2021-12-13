import type { NextApiRequest, NextApiResponse } from 'next';
import { UserJwt } from '../../../lib/user-jwt';
import { User } from '../../../server/src/models';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const userJwt = UserJwt(req, res)

  const { id: userId } = await User.create(req.body) as any;

  const user = await User.findByPk(userId);

  // @ts-ignore
  userJwt.set(user.id)

  return res.status(200).send(user);
}