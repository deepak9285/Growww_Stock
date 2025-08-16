import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {ThemeContext} from '../contexts/themeContext';
import {useWatchlists} from '../store/watchlists';

export default function TopBar({
  title,
  icon,
  inputSearch,
  setInputSearch,
  setSlider,
  symbol,
  fetchSearchResults,
}) {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {lists, removeSymbol, isInAnyList} = useWatchlists();
  const [inWatchlist, setInWatchlist] = useState(false);
  useEffect(() => {
    setInWatchlist(isInAnyList(symbol));
  }, [symbol, lists]);

  const handleBookmark = () => {
    if (inWatchlist) {
      lists.forEach(list => {
        if (list.symbols.includes(symbol)) {
          removeSymbol(list.id, symbol);
        }
      });
    } else {
      setSlider(true);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 5,
        backgroundColor: theme.background,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.text}}>
        {title}
      </Text>

      {icon === 'search' && (
        <View
          style={[
            styles.searchInputContainer,
            {backgroundColor: theme.background, borderColor: theme.text},
          ]}>
          <TextInput
            style={[
              styles.searchInput,
              {borderColor: theme.text, color: theme.text},
            ]}
            placeholder="Search symbol"
            placeholderTextColor="#aaa"
            maxLength={100}
            value={inputSearch}
            onChangeText={setInputSearch}
          />
          <TouchableOpacity
            style={{paddingHorizontal: 5}}
            onPress={() => fetchSearchResults(inputSearch)}>
            <MaterialIcons name="search" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      )}

      {icon === 'bookmark' && (
        <TouchableOpacity onPress={handleBookmark}>
          <MaterialIcons
            name={inWatchlist ? 'bookmark' : 'bookmark-border'}
            size={24}
            color={inWatchlist ? '#28A745' : '#909090'}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={toggleTheme}>
        <MaterialIcons
          name={theme.background === '#0D0D0D' ? 'light-mode' : 'dark-mode'}
          size={28}
          color={theme.background === '#0D0D0D' ? '#FFD700' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
});
