import classNames from 'classnames';
import { useCallback, useState } from 'preact/hooks';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });
  /** @type {React.RefCallback<HTMLDivElement>} */
  const callbackRef = useCallback((el) => {
    setContainerSize({
      height: el?.clientHeight ?? 0,
      width: el?.clientWidth ?? 0,
    });
  }, []);

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = height / width;

  return (
    <div ref={callbackRef} className="relative w-full h-full overflow-hidden">
      <LazyLoadImage
        alt={alt}
        className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
          'w-auto h-full': containerRatio > imageRatio,
          'w-full h-auto': containerRatio <= imageRatio,
        })}
        width={width}
        height={height}
        src={src}
      />
    </div>
  );
};

export { CoveredImage };
