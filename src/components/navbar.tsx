import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';


const { width } = Dimensions.get('window');

const Navbar = ({ currentScreen, setCurScreen }: any) => {
  return (
    <View style={styles.navBar}>
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
    label: 'Explore',
    iconActive: 'compass',
    iconInactive: 'compass-outline',
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
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: '#212121',
    borderTopColor: '#eaeaea',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2, // two items, so half width each
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
