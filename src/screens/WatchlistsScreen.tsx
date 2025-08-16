
import React, { useEffect,useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { useWatchlists } from '../store/watchlists';
import EmptyState from '../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { ThemeContext } from '../contexts/themeContext';
import MaterialIcons from '@react-native-vector-icons/material-icons';


export default function WatchlistsScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lists, hydrate } = useWatchlists();
 const {theme}=useContext(ThemeContext);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!lists.length) {
    return (
      <View style={[styles.container,{backgroundColor:theme.background}]}>

        <Text style={[styles.title,{color:theme.text}]}>Watchlists</Text>

        <EmptyState message="No watchlists yet. Add stocks to watchlists from the product screen." />
      </View>
    );
  }

  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>
      <Text style={[styles.title,{color:theme.text}]}>Watchlists</Text>

     <FlatList
  data={lists}
  keyExtractor={(list) => list.id}
  contentContainerStyle={{ paddingBottom: spacing.lg }}
  style={{ flex: 1 }}
  renderItem={({ item }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.card,{backgroundColor:theme.card,borderColor:'gray'}]}


        onPress={() => nav.navigate('Watchlist', { item })}
      >
        <View style={[styles.cardHeader,{backgroundColor:theme.card}]}>

          <Text style={[styles.cardTitle,{color:theme.text}]}>{item.name}</Text>

          <Text style={styles.cardCount}>{item.symbols.length} stock</Text>
          <MaterialIcons name={'arrow-forward'} size={24} color={theme.text} />

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
   // backgroundColor: colors.background || '#fff',
    padding: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  card: {
  
  borderRadius: 12,
  padding: spacing.md,
  marginBottom: spacing.md,
  borderWidth: 1,
  alignSelf: 'stretch',
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
