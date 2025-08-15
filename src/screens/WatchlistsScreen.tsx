// import React, {useEffect} from 'react';
// import {View, Text, FlatList, Pressable, TouchableOpacity} from 'react-native';
// import {colors, spacing} from '../theme';
// import {useWatchlists} from '../store/watchlists';
// import EmptyState from '../components/EmptyState';
// import StockCard from '../components/StockCard';
// import {useNavigation} from '@react-navigation/native';
// import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import type {RootStackParamList} from '../navigation/RootNavigator';
// export default function WatchlistsScreen() {
//   const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const {lists, hydrate, removeSymbol} = useWatchlists();
//   console.log('losts', lists);
//   useEffect(() => {
//     hydrate();
//   }, [hydrate]);
//   if (!lists.length) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: colors.background,
//           padding: spacing.lg,
//         }}>
//         <Text
//           style={{
//             color: colors.text,
//             fontSize: 22,
//             fontWeight: '800',
//             marginBottom: spacing.lg,
//           }}>
//           Watchlists
//         </Text>
//         <EmptyState message="No watchlists yet. Add stocks to watchlists from the product screen." />
//       </View>
//     );
//   }
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.background,
//         padding: spacing.lg,
//       }}>
//       <Text
//         style={{
//           color: colors.text,
//           fontSize: 22,
//           fontWeight: '800',
//           marginBottom: spacing.lg,
//         }}>
//         Watchlists
//       </Text>
//       <FlatList
//         data={lists}
//         keyExtractor={list => list.id}
//         renderItem={({item}) => (
//           <View
//             style={{
//               marginBottom: spacing.lg,
//               backgroundColor: colors.card,
//               borderRadius: 10,
//               borderWidth: 1,
//               borderColor: colors.border,
//               padding: spacing.md,
//               width:'100%',
//             }}>
//             <TouchableOpacity onPress={() => nav.navigate('Watchlist', { item: item })}>
//               <Text
//                 style={{
//                   color: colors.text,
//                   fontSize: 18,
//                   fontWeight: '700',
//                   marginBottom: spacing.sm,
//                 }}>
//                 {item.name}
//               </Text>
//             </TouchableOpacity>

//           </View>
//         )}
//       />
//     </View>
//   );
// }
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { useWatchlists } from '../store/watchlists';
import EmptyState from '../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';


export default function WatchlistsScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lists, hydrate } = useWatchlists();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!lists.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Watchlists</Text>
        <EmptyState message="No watchlists yet. Add stocks to watchlists from the product screen." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlists</Text>
     <FlatList
  data={lists}
  keyExtractor={(list) => list.id}
  contentContainerStyle={{ paddingBottom: spacing.lg }}
  style={{ flex: 1 }}
  renderItem={({ item }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
        onPress={() => nav.navigate('Watchlist', { item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCount}>{item.symbols.length} stocks</Text>
        </View>
      </TouchableOpacity>
    </View>
  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#fff',
    padding: spacing.lg,
  },
  title: {
    color: colors.text || '#000',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  card: {
  backgroundColor: colors.card || '#fdfdfd',
  borderRadius: 12,
  padding: spacing.md,
  marginBottom: spacing.md,
  borderWidth: 1,
  borderColor: colors.border || '#e0e0e0',
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
  alignSelf: 'stretch', // ensures it takes full width
},

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text || '#000',
  },
  cardCount: {
    fontSize: 14,
    color: colors.subtext || '#777',
    fontWeight: '500',
  },
});
