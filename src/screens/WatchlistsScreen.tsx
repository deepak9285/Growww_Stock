import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { colors, spacing } from '../theme';
import { useWatchlists } from '../store/watchlists';
import EmptyState from '../components/EmptyState';
import StockCard from '../components/StockCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function WatchlistsScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lists, hydrate, removeSymbol } = useWatchlists();

  useEffect(() => {
    hydrate(); // Load from AsyncStorage on mount
  }, [hydrate]);

  if (!lists.length) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: spacing.lg }}>
          Watchlists
        </Text>
        <EmptyState message="No watchlists yet. Add stocks to watchlists from the product screen." />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: spacing.lg }}>
        Watchlists
      </Text>

      <FlatList
        data={lists}
        keyExtractor={(list) => list.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: spacing.lg,
              backgroundColor: colors.card,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              padding: spacing.md,
            }}
          >
            {/* List Header */}
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: spacing.sm }}>
              {item.name}
            </Text>

            {/* Stock Symbols */}
            {item.symbols.length ? (
              <FlatList
                data={item.symbols}
                keyExtractor={(sym) => sym}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
                renderItem={({ item: sym }) => (
                  <View style={{ width: 140 }}>
                    <StockCard
                      symbol={sym}
                      price={0} // Can fetch price if needed
                      changePercent={0}
                      onPress={() => nav.navigate('Product', { symbol: sym })}
                    />
                    <Pressable
                      onPress={() => removeSymbol(item.id, sym)}
                      style={{
                        marginTop: spacing.xs,
                        backgroundColor: colors.danger,
                        paddingVertical: 4,
                        borderRadius: 6,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 12 }}>Remove</Text>
                    </Pressable>
                  </View>
                )}
              />
            ) : (
              <Text style={{ color: colors.subtext }}>No stocks yet.</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
