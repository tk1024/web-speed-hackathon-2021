import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import UserProfileContainer from "../../client/src/containers/UserProfileContainer"

const UserPage: NextPage = () => {
  const router = useRouter()
  const { username } = router.query as { username: string }

  if(!username) {
    return null
  }

  return (
    <UserProfileContainer username={username} />
  )
}

export default UserPage
