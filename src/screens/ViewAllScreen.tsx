
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing } from '../theme';
import StockCard from '../components/StockCard';
import EmptyState from '../components/EmptyState';

type Props = NativeStackScreenProps<RootStackParamList, 'ViewAll'>;

export default function ViewAllScreen({ route, navigation }: Props) {
  const { title, data: initialData } = route.params;

  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  // Slice the data for current page
  const paginatedData = initialData.slice(0, page * ITEMS_PER_PAGE);

  const renderItem = ({ item }: { item: any }) => (
    <StockCard
      symbol={item.symbol || item.ticker}
      price={item.price}
      changePercent={item.changePercent || item.change_percentage}
      onPress={() =>
        navigation.navigate('Product', { symbol: item.symbol || item.ticker })
      }
    />
  );

  const loadMore = () => {
    if (paginatedData.length < initialData.length) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
      <Text
        style={{
          color: colors.text,
          fontSize: 22,
          fontWeight: '800',
          marginBottom: spacing.lg,
        }}
      >
        {title}
      </Text>

      {initialData.length === 0 ? (
        <EmptyState message={`No data for ${title.toLowerCase()}.`} />
      ) : (
        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item.symbol || item.ticker}
          renderItem={renderItem}
          contentContainerStyle={{ gap: spacing.sm }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5} // load more when halfway down
        />
      )}
    </View>
  );
}
