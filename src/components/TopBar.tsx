import { View, Text,TextInput,StyleSheet ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TopBar({title,icon,inputSearch,setInputSearch,setSlider , inWatchlist,fetchSearchResults}) {
  console.log("inwatchlist",inWatchlist);

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
          {title}
        </Text>

     {icon==="search"&& (
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
          maxLength={100}
          value={inputSearch}
          onChangeText={text => setInputSearch(text)}
        />
        <TouchableOpacity onPress={()=>fetchSearchResults(inputSearch)}>
          <MaterialIcons name='search' size={24} color='#000' />

        </TouchableOpacity>

      </View>) }
      {icon==="bookmark"&& (
        <TouchableOpacity onPress={()=>setSlider(true)}>
          {/* <Text>Bookmark</Text> */}
           <MaterialIcons
        name={inWatchlist ? "bookmark" : "bookmark-border"}
        size={24}
        color={inWatchlist ? "#FFD000" : "#909090"}
        onPress={() => setSlider(true)} // open modal to manage watchlist
      />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles=StyleSheet.create({
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
    marginHorizontal: 10,
    height: 42,
    backgroundColor: '#f1f1f1',
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 42,
    fontSize: 16,
    color: '#000',
  },
})