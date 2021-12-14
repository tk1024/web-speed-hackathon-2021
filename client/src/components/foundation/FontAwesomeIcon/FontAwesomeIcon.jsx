import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} iconType
 * @property {'solid' | 'regular'} styleType
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ iconType, styleType }) => {
  if (styleType !== "solid") {
    return (
      <svg className="font-awesome inline-block leading-none fill-current">
        <use xlinkHref={`/sprites/font-awesome/${styleType}.svg#${iconType}`} />
      </svg>
    );
  } else {
    return (
      <svg className="font-awesome inline-block leading-none fill-current">
        <use xlinkHref={`#${iconType}`} />
      </svg>
    );
  }
};

export { FontAwesomeIcon };
