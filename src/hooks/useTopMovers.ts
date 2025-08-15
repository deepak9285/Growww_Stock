import { useEffect, useState } from 'react';
import { getTopGainersLosers, StockMover } from '../api/alphaVantage';

export function useTopMovers() {
  const [data, setData] = useState<{ gainers: StockMover[]; losers: StockMover[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getTopGainersLosers()
      .then((res) => {
        setData(res);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const refresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading: loading,
    isError: error,
    refetch: fetchData,
    isRefetching: refreshing,
  };
}
