
import React, { useState, useCallback, useMemo,useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native'
import { spacing } from '../theme';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import StockCard from '../components/StockCard';
import { ThemeContext } from '../contexts/themeContext';
import EmptyState from '../components/EmptyState';
type Props = NativeStackScreenProps<RootStackParamList, 'ViewAll'>;

export default function ViewAllScreen({ route, navigation }: Props) {
  const { title, data: initialData } = route.params;
  const nav=useNavigation();
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const {theme}=useContext(ThemeContext);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {
    setPage(1);
    setLoading(false);
  }, []);
  const paginatedData = useMemo(() => {
    if (!initialData || !Array.isArray(initialData)) return [];
    return initialData.slice(0, page * ITEMS_PER_PAGE);
  }, [initialData, page]);
  const hasMoreItems = paginatedData.length < (initialData?.length || 0);
  const renderItem = useCallback(({ item }: { item: any }) => {
    const symbol = item?.symbol || item?.ticker;
    if (!symbol || !isMounted) {
      return null;
    }
    return (
      <View style={{width:'48%',marginBottom:spacing.sm,backgroundColor:theme.background}}>
      <StockCard
        symbol={symbol}
        price={item.price}
        changePercent={parseFloat((item.changePercen || item.change_percentage || '0').replace('%', ''))}
        onPress={() => {
          if (isMounted) {
            navigation.navigate('Product', { symbol });
          }
        }}
      />
      </View>
    );
  }, [navigation, isMounted]);
  const keyExtractor = useCallback((item: any, index: number) => {
    const symbol = item?.symbol || item?.ticker;
    return symbol ? `${symbol}-${index}-${title}` : `item-${index}-${title}`;
  }, [title]);
  
  const loadMore = useCallback(() => {
    if (hasMoreItems && !loading && isMounted) {
      setLoading(true);
      requestAnimationFrame(() => {
        if (isMounted) {
          setPage(prev => prev + 1);
          setLoading(false);
        }
      });
    }
  }, [hasMoreItems, loading, isMounted]);
  
  const renderLoadMoreButton = () => {
    if (!hasMoreItems) return null;
    
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: spacing.md,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: spacing.md,
          marginHorizontal: spacing.sm,
        }}
        onPress={loadMore}
        disabled={loading || !isMounted}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Load More ({(initialData?.length || 0) - paginatedData.length} remaining)
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  if (!initialData || !Array.isArray(initialData)) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, padding: spacing.lg }}>
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800', marginBottom: spacing.lg }}>
          {title}
        </Text>
        <EmptyState message="Invalid data received." />
      </View>
    );
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: spacing.lg }}>
       <TouchableOpacity onPress={()=>nav.goBack()}>
       <MaterialIcons name="arrow-back" size={24} color={theme.text} />
       <Text
         style={{
           color: theme.text,
           fontSize: 22,
           fontWeight: '800',
           marginBottom: spacing.lg,
         }}
       >
         {title}
       </Text>
       </TouchableOpacity> 
   
      
      {initialData.length === 0 ? (
        <EmptyState message={`No data for ${title.toLowerCase()}.`} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            key={`flatlist-${title}-${page}`} 
            data={paginatedData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.lg }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            removeClippedSubviews={false} 
            maxToRenderPerBatch={6}
            updateCellsBatchingPeriod={100}
            initialNumToRender={8}
            windowSize={5}
            extraData={`${page}-${isMounted}`}
            showsVerticalScrollIndicator={false}
            getItemLayout={undefined} // Let FlatList calculate layout
          />
          {renderLoadMoreButton()}
        </View>
      )}
    </View>
  );
}