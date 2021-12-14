import React from 'react';

const LIMIT = 10;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher, initial) {
  const internalRef = React.useRef({ isLoading: false, offset: 0 });

  const [result, setResult] = React.useState({
    data: [],
    error: null,
    isLoading: true,
  });

  const fetchMore = React.useCallback(async () => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    const res = await fetcher(`${apiPath}?offset=${offset}&limit=${LIMIT}`).catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset,
      };
    });

    setResult((cur) => ({
      ...cur,
      data: [...cur.data, ...res],
      isLoading: false,
    }));
    internalRef.current = {
      isLoading: false,
      offset: offset + LIMIT,
    };

  }, [apiPath, fetcher]);

  React.useEffect(() => {
    if (initial) {
      setResult(() => ({
        data: initial,
        error: null,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset: initial.length,
      };
    } else {
      setResult(() => ({
        data: [],
        error: null,
        isLoading: true,
      }));
      internalRef.current = {
        isLoading: false,
        offset: 0,
      };

      fetchMore();
    }

  }, [fetchMore]);

  return {
    ...result,
    fetchMore,
  };
}
