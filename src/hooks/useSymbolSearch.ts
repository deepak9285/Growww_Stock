import { useEffect, useState } from 'react';
import { searchSymbols } from '../api/alphaVantage';

type SearchResult = {
  symbol: string;
  name: string;
};

export function useSymbolSearch(query: string) {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 1) {
      setData([]);
      return;
    }

    setLoading(true);
    searchSymbols(query)
      .then((res) => {
        setData(res);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return {
    data,
    isLoading: loading,
    isError: error,
  };
}

//how to use it
// const [searchTerm, setSearchTerm] = useState('');
// const { data, isLoading, isError } = useSymbolSearch(searchTerm);

// // Example input
// <TextInput
//   placeholder="Search for a stock"
//   value={searchTerm}
//   onChangeText={setSearchTerm}
// />

// // Render results
// {isLoading && <ActivityIndicator />}
// {isError && <Text>Error fetching results</Text>}
// {data.map((item) => (
//   <Pressable key={item.symbol} onPress={() => nav.navigate('Product', { symbol: item.symbol })}>
//     <Text>{item.symbol} - {item.name}</Text>
//   </Pressable>
// ))}
