import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

const COOKIE_NAME = "nyan"

export const UserJwt = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const cookies = new Cookies(req, res)

  const get = () => {
    const jwtString = cookies.get(COOKIE_NAME)
    if (jwtString) {
      return jwt.decode(jwtString) as { userId: string }
    }
    return {
      userId: undefined
    }
  }

  const set = (userId: string | undefined) => {
    if (userId === undefined) {
      cookies.set(COOKIE_NAME, "", {
        expires: new Date(),
      })
    } else {
      const token = jwt.sign({ userId: userId }, 'secret!!!');
      cookies.set(COOKIE_NAME, token)
    }
  }

  return {
    get,
    set,
  }
}