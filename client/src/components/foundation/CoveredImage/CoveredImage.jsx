import classNames from 'classnames';
import { LazyLoadImage } from '../../LazyLoadImage/LazyLoadImage';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src, width, height }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <LazyLoadImage
        alt={alt}
        className={classNames('absolute w-full h-full object-cover left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2')}
        width={width}
        height={height}
        src={src}
      />
    </div>
  );
};

export { CoveredImage };
