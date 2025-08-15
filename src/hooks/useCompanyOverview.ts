import { useEffect, useState } from 'react';
import { getCompanyOverview, CompanyOverview } from '../api/alphaVantage';

export function useCompanyOverview(symbol: string) {
  const [data, setData] = useState<CompanyOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getCompanyOverview(symbol)
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
