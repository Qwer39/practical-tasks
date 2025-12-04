import { useState, useEffect, useCallback } from 'react';

function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const fetchData = useCallback(async (abortController) => {
    try {
      setLoading(true);
      setError(null);
      setStatus('loading');

      const response = await fetch(url, {
        ...options,
        signal: abortController?.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setStatus('success');

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setStatus('error');
        console.error('Ошибка в useApi:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    const abortController = new AbortController();

    if (url) {
      fetchData(abortController);
    }

    return () => {
      abortController.abort();
    };
  }, [url, fetchData]);

  const refetch = useCallback(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    return () => abortController.abort();
  }, [fetchData]);

  const mutate = useCallback(async (newData, method = 'POST') => {
    try {
      setLoading(true);
      setError(null);
      setStatus('mutating');

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(newData),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setStatus('success');
      return result;

    } catch (err) {
      setError(err.message);
      setStatus('error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { 
    data, 
    loading, 
    error, 
    refetch, 
    mutate,
    status,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    isMutating: status === 'mutating'
  };
}

export default useApi;