import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} SoundAttributes
 * @property {string} id
 * @property {string} title
 * @property {string} artist
 */

/**
 * @typedef {import('sequelize').Model<SoundAttributes>} SoundModel
 */

/** @type {import('sequelize').ModelCtor<SoundModel>} */
const Sound = sequelize.define('Sound', {
  artist: {
    allowNull: false,
    defaultValue: 'Unknown',
    type: DataTypes.STRING,
  },
  id: {
    allowNull: false,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'UUIDV4' does not exist on type 'typeof S... Remove this comment to see the full error message
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  title: {
    allowNull: false,
    defaultValue: 'Unknown',
    type: DataTypes.STRING,
  },
});

export { Sound };
