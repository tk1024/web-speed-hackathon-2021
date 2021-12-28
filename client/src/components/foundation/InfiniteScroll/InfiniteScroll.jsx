import { useEffect, useRef, useState } from 'preact/hooks';
import React from 'react';


/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore }) => {
  const [isLoading, setIsLoading] = useState(false)
  const prevReachedRef = useRef(false);

  useEffect(() => {
    const handler = async () => {
      const hasReached = window.innerHeight + Math.ceil(window.scrollY) >= document.body.offsetHeight;

      // 画面最下部にスクロールしたタイミングで、登録したハンドラを呼び出す
      if (hasReached && !prevReachedRef.current && !isLoading) {
        setIsLoading(true)
        await fetchMore();
        setTimeout(() => setIsLoading(false), 1000)
      }

      prevReachedRef.current = hasReached;
    };

    document.addEventListener('wheel', handler, { passive: true });
    document.addEventListener('touchmove', handler, { passive: true });
    document.addEventListener('resize', handler, { passive: true });
    document.addEventListener('scroll', handler, { passive: true });
    return () => {
      document.removeEventListener('wheel', handler);
      document.removeEventListener('touchmove', handler);
      document.removeEventListener('resize', handler);
      document.removeEventListener('scroll', handler);
    };
  }, [isLoading, setIsLoading, fetchMore]);

  return <>{children}</>;
};

export { InfiniteScroll };
