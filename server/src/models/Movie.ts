import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} MovieAttributes
 * @property {string} id
 */

/**
 * @typedef {import('sequelize').Model<MovieAttributes>} MovieModel
 */

/** @type {import('sequelize').ModelCtor<MovieModel>} */
const Movie = sequelize.define('Movie', {
  id: {
    allowNull: false,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'UUIDV4' does not exist on type 'typeof S... Remove this comment to see the full error message
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
});

export { Movie };
