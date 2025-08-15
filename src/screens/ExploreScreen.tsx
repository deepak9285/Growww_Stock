// import React, { useCallback,useEffect,useState } from 'react';

// import { View, Text, ScrollView, RefreshControl } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useTopMovers } from '../hooks/useTopMovers';
// import { colors, spacing } from '../theme/index';
// import SectionHeader from '../components/SectionHeader';
// import StockCard from '../components/StockCard';
// import LoadingSkeleton from '../components/LoadingSkeleton';
// import ErrorState from '../components/ErrorState';
// import EmptyState from '../components/EmptyState';
// import type { RootStackParamList } from '../navigation/RootNavigator';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { ALPHA_VANTAGE_API_KEY } from '../config/env';
// import axios from 'axios';

// export default function ExploreScreen() {
//   const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { data, isLoading, isError, refetch, isRefetching } = useTopMovers();
//   const [TopGainers, setTopGainers] = useState([]);
//   const [TopLosers, setTopLosers] =useState({});

//   const openProduct = useCallback(
//     (symbol: string) => {
//       nav.navigate('Product', { symbol });
//     },
//     [nav]
//   );
//    //  console.log("asdf",ALPHA_VANTAGE_API_KEY);
//   const fetchData=async()=>{
//     const data=await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`);
//     setTopGainers(data?.data?.top_gainers);
//     setTopLosers(data?.data?.top_losers);
//   }
//   useEffect(()=>{
//     fetchData();
//   },[])
//   console.log("TopGainers",TopGainers);

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}
//       refreshControl={
//         <RefreshControl
//           refreshing={isRefetching}
//           onRefresh={refetch}
//           tintColor={colors.text}
//         />
//       }
//     >
//       <Text
//         style={{
//           color: colors.text,
//           fontSize: 22,
//           fontWeight: '800',
//           marginBottom: spacing.lg,
//         }}
//       >
//         Explore
//       </Text>

//       <SectionHeader
//         title="Top Gainers"
//         onViewAll={() =>
//           nav.navigate('ViewAll', { section: 'gainers', title: 'Top Gainers' })
//         }
//       />
//       {isLoading ? (
//         <LoadingSkeleton />
//       ) : isError ? (
//         <ErrorState onRetry={refetch} />
//       ) : !data?.gainers?.length ? (
//         <EmptyState message="No data for gainers right now." />
//       ) : (
//         <View
//           style={{
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             rowGap: spacing.sm,
//           }}
//         >

//           {TopGainers.slice(0, 6).map((s) => (
//             <View key={s?.ticker} style={{ width: '48%' }}>

//               <StockCard
//                 symbol={s?.ticker}
//                 price={s?.price}
//                 changePercent={s?.change_percentage}
//                 onPress={() => openProduct(s?.ticker)}
//               />
//             </View>
//           ))}

//         </View>
//       )}

//       <View style={{ height: spacing.xl }} />
//       <SectionHeader
//         title="Top Losers"
//         onViewAll={() =>
//           nav.navigate('ViewAll', { section: 'losers', title: 'Top Losers' })
//         }
//       />
//       {isLoading ? (
//         <LoadingSkeleton />
//       ) : isError ? (
//         <ErrorState onRetry={refetch} />
//       ) : !data?.losers?.length ? (
//         <EmptyState message="No data for losers right now." />
//       ) : (
//         <View
//           style={{
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             rowGap: spacing.sm,
//           }}
//         >
//           {data.losers.slice(0, 6).map((s) => (
//             <View key={s.symbol} style={{ width: '48%' }}>
//               <StockCard
//                 symbol={s.symbol}
//                 price={s.price}
//                 changePercent={s.changePercent}
//                 onPress={() => openProduct(s.symbol)}
//               />
//             </View>
//           ))}
//         </View>
//       )}

//       <View style={{ height: spacing.xl }} />
//     </ScrollView>
//   );
// }
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTopMovers} from '../hooks/useTopMovers';
import {colors, spacing} from '../theme/index';
import SectionHeader from '../components/SectionHeader';
import StockCard from '../components/StockCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import type {RootStackParamList} from '../navigation/RootNavigator';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ALPHA_VANTAGE_API_KEY} from '../config/env';
import axios from 'axios';

export default function ExploreScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {data, isLoading, isError, refetch, isRefetching} = useTopMovers();
  const [TopGainers, setTopGainers] = useState<any[]>([]);
  const [TopLosers, setTopLosers] = useState<any[]>([]);

  const openProduct = useCallback(
    (symbol: string) => {
      nav.navigate('Product', {symbol});
    },
    [nav],
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`,
      );
      setTopGainers(res?.data?.top_gainers || []);
      setTopLosers(res?.data?.top_losers || []);
    } catch (err) {
      console.log('Error fetching top movers:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStockItem = ({item}: {item: any}) => {
    const price = parseFloat(item.price);
    const changePercent = parseFloat(item.change_percentage.replace('%', ''));
    return (
      <View style={{width: '48%', marginBottom: spacing.sm}}>
        <StockCard
          symbol={item.ticker}
          price={price}
          changePercent={changePercent}
          onPress={() => openProduct(item.ticker)}
        />
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text
            style={{
              color: colors.text,
              fontSize: 22,
              fontWeight: '800',
              marginBottom: spacing.lg,
            }}>
            Explore
          </Text>

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
      keyExtractor={item => item.ticker}
      numColumns={2} // 2 items per row
      columnWrapperStyle={{justifyContent: 'space-between'}}
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
          <View style={{height: spacing.xl}} />
          <SectionHeader
            title="Top Losers"
            onViewAll={() =>
              nav.navigate('ViewAll', {section: 'losers', title: 'Top Losers',data: TopLosers})

            }
          />
          <FlatList
            data={TopLosers.slice(0, 4)}
            renderItem={renderStockItem}
            keyExtractor={item => item.ticker}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
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
          <View style={{height: spacing.xl}} />
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
