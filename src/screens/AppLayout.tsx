import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Navbar from '../components/navbar';
import ExploreScreen from './ExploreScreen';
import WatchlistsScreen from './WatchlistsScreen';
import ProductScreen from './ProductScreen';
import ViewAllScreen from './ViewAllScreen';
import TopBar from '../components/TopBar';

const AppLayout = ({navigation}) => {

    const [inputSearch, setInputSearch] = useState('');
  const [curScreen, setCurScreen] = useState<
    'ExploreScreen' | 'WatchlistsScreen' | 'ProductScreen' | 'ViewallScreen' 
  >('ExploreScreen');
  

  return (
    <View style={styles.container}>
        {curScreen === 'ExploreScreen' && <ExploreScreen />}
        {curScreen === 'WatchlistsScreen' && <WatchlistsScreen />}
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
