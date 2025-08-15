import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Navbar from '../components/navbar';
import ExploreScreen from './ExploreScreen';
import WatchlistsScreen from './WatchlistsScreen';
import ProductScreen from './ProductScreen';
import ViewAllScreen from './ViewAllScreen';

const AppLayout = ({navigation}) => {
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [inputSearch, setInputSearch] = useState('');
  const [curScreen, setCurScreen] = useState<
    'explore' | 'watchlist' | 'product' | 'viewall' 
  >('explore');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {curScreen === 'explore' && <ExploreScreen />}
        {curScreen === 'watchlist' && <WatchlistsScreen />}
        {curScreen === 'product' && <ProductScreen navigation={navigation} route={{}}/>}
        {curScreen === 'viewall' && <ViewAllScreen navigation={navigation} route={{}}/>}
      </View>

      {/* Navbar */}
      <Navbar currentScreen={curScreen} setCurScreen={setCurScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f4',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLayout;
