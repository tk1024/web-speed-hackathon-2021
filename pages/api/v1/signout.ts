import type { NextApiRequest, NextApiResponse } from 'next';
import { UserJwt } from '../../../lib/user-jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const userJwt = UserJwt(req, res)
  userJwt.set(undefined)

  return res.status(200).send({});
}