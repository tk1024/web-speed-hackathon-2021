import { UserProfileHeader } from '../UserProfileHeader';


/**
 * @typedef {object} Props
 * @property {Models.User} user
 */

/** @type {React.VFC<Props>} */
const UserProfilePage = ({ user }) => {
  return <UserProfileHeader user={user} />
};

export { UserProfilePage };
