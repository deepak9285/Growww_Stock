
// import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
// import { spacing, colors } from '../theme';
// import StockCard from '../components/StockCard';
// import React from 'react';
// import { useWatchlists } from '../store/watchlists';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import EmptyState from '../components/EmptyState';

// export default function Watchlist({ route }) {
//   const { item } = route.params;
//   const { removeSymbol } = useWatchlists();
//   const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   return (
//     <View style={styles.container}>
//       {/* Watchlist title */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>{item.name}</Text>
//       </View>

//       {/* Watchlist items */}
//       {item.symbols.length ? (
//         <FlatList
//           data={item.symbols}
//           keyExtractor={(sym) => sym}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
//           renderItem={({ item: sym }) => (
//             <View style={styles.stockCardWrapper}>
//               <StockCard
//                 symbol={sym}
//                 price={0}
//                 changePercent={0}
//                 onPress={() => nav.navigate('Product', { symbol: sym })}
//               />
//               <Pressable
//                 onPress={() => removeSymbol(item.id, sym)}
//                 style={styles.removeButton}
//               >
//                 <Text style={styles.removeButtonText}>Remove</Text>
//               </Pressable>
//             </View>
//           )}
//         />
//       ) : (
//         <EmptyState message={"No stocks in this watchlist."} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background || '#fff',
//     padding: spacing.md,
//   },
//   header: {
//     marginBottom: spacing.md,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: colors.text || '#000',
//   },
//   stockCardWrapper: {
//     width: 140,
//   },
//   removeButton: {
//     marginTop: spacing.xs,
//     backgroundColor: colors.danger || '#d9534f',
//     paddingVertical: 4,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   emptyText: {
//     color: colors.subtext || '#666',
//     fontSize: 14,
//     marginTop: spacing.sm,
//   },
// });
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { spacing, colors } from '../theme';
import StockCard from '../components/StockCard';
import React, { useState } from 'react';
import { useWatchlists } from '../store/watchlists';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';

export default function Watchlist({ route }) {
  const { item } = route.params;
  const [symbols, setSymbols] = useState(item.symbols); // local state
  const { removeSymbol } = useWatchlists();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRemove = (sym: string) => {
    setSymbols((prev) => prev.filter((s) => s !== sym));
    removeSymbol(item.id, sym);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{item.name}</Text>
      </View>
      {symbols.length ? (
        <FlatList
          data={symbols}
          keyExtractor={(sym) => sym}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
          renderItem={({ item: sym }) => (
            <View style={styles.stockCardWrapper}>
              <StockCard
                symbol={sym}
                price={0}
                changePercent={0}
                onPress={() => nav.navigate('Product', { symbol: sym })}
              />
              <Pressable
                onPress={() => handleRemove(sym)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <EmptyState message={"No stocks in this watchlist."} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#fff',
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text || '#000',
  },
  stockCardWrapper: {
    width: 140,
  },
  removeButton: {
    marginTop: spacing.xs,
    backgroundColor: colors.danger || '#d9534f',
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyText: {
    color: colors.subtext || '#666',
    fontSize: 14,
    marginTop: spacing.sm,
  },
});
