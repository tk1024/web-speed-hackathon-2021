import classNames from 'classnames';
import React, { useCallback } from 'react';


/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  const callbackRef = React.useRef(null)
  const [containerSize, setContainerSize] = React.useState({ height: 0, width: 0 });
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 })

  const onload = useCallback((ev) => {
    setImageSize({ width: ev.target.width, height: ev.target.height })
    if(callbackRef.current) {
      setContainerSize({
        height: callbackRef.current.clientHeight ?? 0,
        width: callbackRef.current.clientWidth ?? 0,
      });
    }
  }, [setImageSize, setContainerSize, callbackRef])

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = imageSize?.height / imageSize?.width;

  return (
    <div ref={callbackRef} className="relative w-full h-full overflow-hidden">
      <img
        alt={alt}
        className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
          'w-auto h-full': containerRatio > imageRatio,
          'w-full h-auto': containerRatio <= imageRatio,
        })}
        onLoad={onload}
        src={src}
        loading="lazy"
      />
    </div>
  );
};

export { CoveredImage };
