import classNames from 'classnames';
import React, { useRef } from 'react';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({
  src
}: any) => {
  const ref = useRef(null)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isPlaying, setIsPlaying] = React.useState(!prefersReducedMotion);

  const handleClick = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pause' does not exist on type 'never'.
        ref.current?.pause();
      } else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'play' does not exist on type 'never'.
        ref.current?.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <video ref={ref} autoPlay={!prefersReducedMotion} muted loop>
          <source src={src.replace("mp4", "webm")} type="video/webm" />
          <source src={src} type="video/mp4"></source>
        </video>
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };
