import { useEffect, useState } from 'react';
import { getDailySeries } from '../api/alphaVantage';

export function useTimeSeries(symbol: string) {
  const [data, setData] = useState<{ x: Date; y: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getDailySeries(symbol)
      .then((res) => {
        setData(res);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return {
    data,
    isLoading: loading,
    isError: error,
    refetch: fetchData,
  };
}
