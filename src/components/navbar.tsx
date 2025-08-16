import MaterialIcons from '@react-native-vector-icons/material-icons';
import React,{useContext} from 'react';
import {ThemeContext} from '../contexts/themeContext';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';


const { width } = Dimensions.get('window');

const Navbar = ({ currentScreen, setCurScreen }: any) => {
  const {theme}=useContext(ThemeContext);

  return (
    <View style={[styles.navBar]}>

      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => setCurScreen(item.key)}
          style={styles.navItem}
          activeOpacity={0.8}
        >
          {currentScreen === item.key && (
            <View style={styles.circleHighlight}>
              <View style={styles.innerDot} />
            </View>
          )}
          <MaterialIcons name={currentScreen === item.key ? item.iconActive : item.iconInactive} size={24} color={currentScreen === item.key ? '#FFD000' : '#909090'} />
          <Text
            style={
              currentScreen === item.key ? styles.activenavText : styles.navText
            }
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const navItems = [
  {
    key: 'ExploreScreen',
    label: 'Stocks',
    iconActive: 'insights',
    iconInactive: 'insights',
  },
  {
    key: 'WatchlistsScreen',
    label: 'Watchlists',
    iconActive: 'star',
    iconInactive: 'star-outline',
  },
];

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   
    paddingBottom: 5,
    backgroundColor: '#212121',
    borderTopColor: '#eaeaea',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2, 
    paddingVertical: 5,
  },
  activenavText: {
    fontSize: 12,
    color: '#FFD000',
    marginTop: 2,
  },
  navText: {
    fontSize: 12,
    color: '#909090',
    marginTop: 2,
  },
  circleHighlight: {
    position: 'absolute',
    top: -30,
    width: 45,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    zIndex: -1,
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#FFD000',
  },
});

export default Navbar;
