
// import React, {useCallback, useEffect, useState} from 'react';
// import {View, Text, FlatList, RefreshControl} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {useTopMovers} from '../hooks/useTopMovers';
// import {colors, spacing} from '../theme/index';
// import SectionHeader from '../components/SectionHeader';
// import StockCard from '../components/StockCard';
// import LoadingSkeleton from '../components/LoadingSkeleton';
// import ErrorState from '../components/ErrorState';
// import EmptyState from '../components/EmptyState';
// import type {RootStackParamList} from '../navigation/RootNavigator';
// import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {ALPHA_VANTAGE_API_KEY} from '../config/env';
// import axios from 'axios';
// import TopBar from '../components/TopBar';
// import {searchResults} from '../components/TopBar';


// export default function ExploreScreen() {
//   const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const {data, isLoading, isError, refetch, isRefetching} = useTopMovers();
//   const [TopGainers, setTopGainers] = useState<any[]>([]);
//   const [TopLosers, setTopLosers] = useState<any[]>([]);
//   const [InputSearch, setInputSearch] = useState('');
//   const [searchResults, setSearchResults]= useState([]);
//   const [searching,setIsSearching]=useState(false);


//   const openProduct = useCallback(
//     (symbol: string) => {
//       nav.navigate('Product', {symbol});
//     },
//     [nav],
//   );

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(
//         `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`,
//       );
//       setTopGainers(res?.data?.top_gainers || []);
//       setTopLosers(res?.data?.top_losers || []);
//     } catch (err) {
//       console.log('Error fetching top movers:', err);
//     }
//   };
//     const fetchSearchResults = async (query: string) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }
//     try {
//       setIsSearching(true);
//       const res = await axios.get(
//         `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
//           query
//         )}&apikey=demo`
//       );
//       console.log(res);
//       setSearchResults(res?.data?.bestMatches || []);
//     } catch (err) {
//       console.log('Error fetching search results:', err);
//     } finally {
//       setIsSearching(false);
//     }


//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderStockItem = ({item}: {item: any}) => {
//     const price = parseFloat(item.price);
//     const changePercent = parseFloat(item.change_percentage.replace('%', ''));
//     return (
//       <View style={{width: '48%', marginBottom: spacing.sm}}>
//         <StockCard
//           symbol={item.ticker}
//           price={price}
//           changePercent={changePercent}
//           onPress={() => openProduct(item.ticker)}
//         />
//       </View>
//     );
//   };

//   if(searchResults.length>0){
//     return (
//       <FlatList
//         data={searchResults}
//         renderItem={renderStockItem}
//         keyExtractor={item => item.ticker}
//         numColumns={2}
//         columnWrapperStyle={{justifyContent: 'space-between'}}
//       />
//     )
//   }


//   return (
//     <FlatList
//       ListHeaderComponent={
//         <>
        
//           <TopBar title='Explore' icon='search' inputSearch={InputSearch} setInputSearch={setInputSearch} fetchSearchResults={fetchSearchResults}/>

//           <SectionHeader
//             title="Top Gainers"
//             onViewAll={() =>
//               nav.navigate('ViewAll', {
//                 section: 'gainers',
//                 title: 'Top Gainers',
//                 data: TopGainers,
//               })
//             }
//           />
//         </>
//       }
//       data={TopGainers.slice(0, 4)}
//       renderItem={renderStockItem}
//       keyExtractor={item => item.ticker}
//       numColumns={2} // 2 items per row
//       columnWrapperStyle={{justifyContent: 'space-between'}}
//       ListEmptyComponent={
//         isLoading ? (
//           <LoadingSkeleton />
//         ) : isError ? (
//           <ErrorState onRetry={refetch} />
//         ) : (
//           <EmptyState message="No data for gainers right now." />
//         )
//       }
//       ListFooterComponent={
//         <>
//           <View style={{height: spacing.xl}} />
         
//           <SectionHeader
//             title="Top Losers"
//             onViewAll={() =>
//               nav.navigate('ViewAll', {section: 'losers', title: 'Top Losers',data: TopLosers})

//             }
//           />
//           <FlatList
//             data={TopLosers.slice(0, 4)}
//             renderItem={renderStockItem}
//             keyExtractor={item => item.ticker}
//             numColumns={2}
//             columnWrapperStyle={{justifyContent: 'space-between'}}
//             ListEmptyComponent={
//               isLoading ? (
//                 <LoadingSkeleton />
//               ) : isError ? (
//                 <ErrorState onRetry={refetch} />
//               ) : (
//                 <EmptyState message="No data for losers right now." />
//               )
//             }
//           />
//           <View style={{height: spacing.xl}} />
//         </>
//       }
//       refreshControl={
//         <RefreshControl
//           refreshing={isRefetching}
//           onRefresh={refetch}
//           tintColor={colors.text}
//         />
//       }
//     />
//   );
// }
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTopMovers } from '../hooks/useTopMovers';
import { colors, spacing } from '../theme/index';
import SectionHeader from '../components/SectionHeader';
import StockCard from '../components/StockCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import TopBar from '../components/TopBar';

export default function ExploreScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isLoading, isError, refetch, isRefetching } = useTopMovers();
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



  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`
      );
      setTopGainers(res?.data?.top_gainers || []);
      setTopLosers(res?.data?.top_losers || []);
      setIsLoading(false);

    } catch (err) {
      console.log('Error fetching top movers:', err);
    }
  };

  const fetchSearchResults = async (query: string) => {
    console.log('query');

    // if (!query.trim()) {
    //   setSearchResults([]);
    //   return;
    // }
    try {
      setIsSearching(true);
      const res = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
          query
        )}&apikey=0891QCPUCG9GPJTT`
        // `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`
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

  useEffect(() => {
    fetchData();
  }, []);

  const renderStockItem = ({ item }: { item: any }) => {
    const price = parseFloat(item.price);
    const changePercent = parseFloat(
      (item.change_percentage || '0').replace('%', '')
    );
    return (
      <View style={{ width: '48%', marginBottom: spacing.sm }}>
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
      <>
       <TopBar
            title="Explore"
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
      </>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <TopBar
            title="Explore"
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
        isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <EmptyState message="No data for gainers right now." />
        )
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
            ListEmptyComponent={
              isLoading ? (
                <LoadingSkeleton />
              ) : isError ? (
                <ErrorState onRetry={refetch} />
              ) : (
                <EmptyState message="No data for losers right now." />
              )
            }
          />
          <View style={{ height: spacing.xl }} />
        </>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor={colors.text}
        />
      }
    />
  );
}
