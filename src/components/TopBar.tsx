import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {Button} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../contexts/themeContext';

export default function TopBar({
  title,
  icon,
  inputSearch,
  setInputSearch,
  setSlider,
  inWatchlist,
  fetchSearchResults,
}) {
  const {theme} = useContext(ThemeContext);
  const {toggleTheme} = useContext(ThemeContext);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 5,
        backgroundColor: theme.background,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.text,
        }}>
        {title}
      </Text>

      {icon === 'search' && (
        <View style={[styles.searchInputContainer,{backgroundColor:theme.background,borderColor:theme.text}]}>


          <TextInput
            style={[styles.searchInput,{borderColor:theme.text,color:theme.text}]}

            placeholder="Search symbol"
            placeholderTextColor="#aaa"
            maxLength={100}
            value={inputSearch}
            onChangeText={text => setInputSearch(text)}
          />
          <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => fetchSearchResults(inputSearch)}>
            <MaterialIcons name="search" size={24} color={theme.text} />

          </TouchableOpacity>
        </View>
      )}
      {icon === 'bookmark' && (
        <TouchableOpacity onPress={() => setSlider(true)}>
          <MaterialIcons
            name={inWatchlist ? 'bookmark' : 'bookmark-border'}
            size={24}
            color={inWatchlist ? '#28A745' : '#909090'}
            onPress={() => setSlider(true)}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={toggleTheme}>
        <MaterialIcons
          name={theme.background==='#0D0D0D' ? 'light-mode' : 'dark-mode'}
          size={28}
          color={theme.background==='#0D0D0D' ? '#FFD700' : '#000'}

        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 8,
    zIndex: 1,
  },
  searchInputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginHorizontal: 10,
    height: 42,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    paddingLeft: 40,
    fontSize: 16,
    color: '#000',
  },
  searchInput: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    fontSize: 16,
    borderWidth:0.5,
    borderRadius:15
    
  },
});
