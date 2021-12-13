import type { NextApiRequest, NextApiResponse } from 'next'

import { insertSeeds } from '../../../server/src/seeds';
import { sequelize } from '../../../server/src/sequelize';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  return res.status(200).send({});
}