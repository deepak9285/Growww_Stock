
import React, { useCallback, useEffect,useContext, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../theme/index';
import SectionHeader from '../components/SectionHeader';
import StockCard from '../components/StockCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TopBar from '../components/TopBar';
import {ThemeContext} from '../contexts/themeContext';


export default function ExploreScreen() {
  const {theme}=useContext(ThemeContext);

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
 const [IsLoading,setIsLoading]=useState(false);
  const [TopGainers, setTopGainers] = useState<any[]>([]);
  const [TopLosers, setTopLosers] = useState<any[]>([]);
  const [InputSearch, setInputSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setIsSearching] = useState(false);

  const openProduct = useCallback(
    (symbol: string) => {
      nav.navigate('Product', { symbol });
    },
    [nav]
  );
 const Cache_ttl=10*60*1000;
 const url='https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=0891QCPUCG9GPJTT';
  const fetchData = async () => {
    const now=Date.now();
    try {
      setIsLoading(true);
      let cachedData=await AsyncStorage.getItem(url);
      console.log("cachedData",cachedData);
      if(cachedData){
        const {data,timestamp}=JSON.parse(cachedData);
        if(now-timestamp<Cache_ttl){
          setTopGainers(data?.top_gainers || []);
          setTopLosers(data?.top_losers || []);
          setIsLoading(false);
          return;
        }
      }
      const res = await axios.get(url);
      setTopGainers(res?.data?.top_gainers || []);
      setTopLosers(res?.data?.top_losers || []);
      await AsyncStorage.setItem(url,JSON.stringify({
        data:res?.data,
        timestamp:now,
      }));
    } catch (err) {
      const stored=await AsyncStorage.getItem(url);
      if(stored){
        const {data}=JSON.parse(stored);
        setTopGainers(data?.top_gainers || []);
        setTopLosers(data?.top_losers || []);
      }
    }
    finally{
      setIsLoading(false);
    }
  };

  const fetchSearchResults = async (query: string) => {
    try {
      setIsSearching(true);
      const res = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
          query
        )}&apikey=0891QCPUCG9GPJTT`
      );
      console.log("res",res);
      const matches = res?.data?.bestMatches?.map((match: any) => ({
        ticker: match['1. symbol'],
        name: match['2. name'],
        price: match['5. price'] || '0',
        change_percentage: match['10. change percent'] || '0%',
      })) || [];
      setSearchResults(matches);
    } catch (err) {
      console.log('Error fetching search results:', err);
    } finally {
      setIsSearching(false);
    }
  };

   useEffect(()=>{
    fetchSearchResults(InputSearch);
  },[InputSearch])

  useEffect(() => {
    fetchData();
  }, []);

  const renderStockItem = ({ item }: { item: any }) => {
    const price = parseFloat(item.price);
    const changePercent = parseFloat(
      (item.change_percentage || '0').replace('%', '')
    );
    return (
      <View style={{ width: '48%', backgroundColor:theme.background, marginBottom: spacing.sm }}>
        <StockCard
          symbol={item.ticker}
          price={price}
          changePercent={changePercent}
          onPress={() => openProduct(item.ticker)}
        />
      </View>
    );
  };
    if(IsLoading){
    return <LoadingSkeleton />
  }

  if (searchResults.length > 0) {
    return (
      <View style={{backgroundColor:theme.background}}>
       <TopBar
            title="Stocks"
            icon="search"
            inputSearch={InputSearch}
            setInputSearch={setInputSearch}
            fetchSearchResults={fetchSearchResults}
          />
      <FlatList
        data={searchResults}
        renderItem={renderStockItem}
        keyExtractor={(item) => item.ticker}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
      </View>
    );
  }
  return (
    <View style={{backgroundColor:theme.background,padding:8}}>
    <FlatList
      ListHeaderComponent={
        <>
          <TopBar
            title="Stocks"
            icon="search"
            inputSearch={InputSearch}
            setInputSearch={setInputSearch}
            fetchSearchResults={fetchSearchResults}
          />

          <SectionHeader
            title="Top Gainers"
            onViewAll={() =>
              nav.navigate('ViewAll', {
                section: 'gainers',
                title: 'Top Gainers',
                data: TopGainers,
              })
            }
          />
        </>
      }
      data={TopGainers.slice(0, 4)}
      renderItem={renderStockItem}
      keyExtractor={(item) => item.ticker}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      ListEmptyComponent={
        <EmptyState message="No data for gainers right now." />
      }
      ListFooterComponent={
        <>
          <View style={{ height: spacing.xl }} />

          <SectionHeader
            title="Top Losers"
            onViewAll={() =>
              nav.navigate('ViewAll', {
                section: 'losers',
                title: 'Top Losers',
                data: TopLosers,
              })
            }
          />
          <FlatList
            data={TopLosers.slice(0, 4)}
            renderItem={renderStockItem}
            keyExtractor={(item) => item.ticker}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            ListEmptyComponent={<EmptyState message="No data for losers right now." />}
          />
          <View style={{ height: spacing.xl }} />
        </>
      }
      
    />
    </View>
  );
}
