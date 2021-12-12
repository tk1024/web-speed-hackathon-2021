import React from 'react';

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath: string, fetcher: any) {
  const [result, setResult] = React.useState<{
    data: any,
    error: any,
    isLoading: boolean
  }>({
    data: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    setResult(() => ({
      data: null,
      error: null,
      isLoading: true,
    }));

    const promise = fetcher(apiPath);

    promise.then((data: any) => {
      setResult((cur) => ({
        ...cur,
        data,
        isLoading: false,
      }));
    });

    promise.catch((error: any) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
    });
  }, [apiPath, fetcher]);

  return result;
}
