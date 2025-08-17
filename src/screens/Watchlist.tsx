import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { spacing } from '../theme';
import StockCard from '../components/StockCard';
import React, { useState, useContext } from 'react';
import { useWatchlists } from '../store/watchlists';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/EmptyState';
import { ThemeContext } from '../contexts/themeContext';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (spacing.lg * 2); 

export default function Watchlist({ route }) {
  const { item } = route.params;
  const [symbols, setSymbols] = useState(item.symbols);
  const { removeSymbol } = useWatchlists();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  
  const handleRemove = (sym: string) => {
    setSymbols((prev) => prev.filter((s) => s !== sym));
    removeSymbol(item.id, sym);
  };

  const renderStockItem = ({ item: sym }) => (
    <View style={[styles.stockCardWrapper, { width: CARD_WIDTH }]}>
      <View style={styles.stockCardContainer}>
        <StockCard
          symbol={sym}
          price={0}
          changePercent={0}
          onPress={() => nav.navigate('Product', { symbol: sym })}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(sym)}
        style={[styles.removeButton, { backgroundColor: theme.danger }]}
        activeOpacity={0.7}
      >
        <MaterialIcons name="delete-outline" size={16} color="#fff" />
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.headerContainer, { borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => nav.goBack()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.subtext }]}>
            {symbols.length} stock{symbols.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {symbols.length > 0 ? (
          <FlatList
            data={symbols}
            keyExtractor={(sym) => sym}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
            renderItem={renderStockItem}
            ListHeaderComponent={() => (
              <View style={styles.listHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Your Stocks
                </Text>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <EmptyState 
              message="No stocks in this watchlist yet."
              subtitle="Add some stocks to get started"
            />
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: theme.primary }]}
              onPress={() => nav.navigate('ExploreScreen')} 
              activeOpacity={0.8}
            >
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Stocks</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
    borderRadius: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: spacing.sm,
    borderRadius: 8,
    marginLeft: spacing.xs, 
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  listContainer: {
    paddingBottom: spacing.xl,
  },
  listHeader: {
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
  },
  stockCardWrapper: {
    marginBottom: spacing.sm,
    minHeight: 120, 
  },
  stockCardContainer: {
    flex: 1,
    minHeight: 80, 
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4, 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginTop: spacing.lg,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.xs, 
  },
});
