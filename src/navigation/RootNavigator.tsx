import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLayout from '../screens/AppLayout';
import ProductScreen from '../screens/ProductScreen';
import ViewAllScreen from '../screens/ViewAllScreen';
import Watchlist from '../screens/Watchlist';


const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ExploreScreen"
    >
      <RootStack.Screen name="ExploreScreen" component={AppLayout} />
      <RootStack.Screen name="Product" component={ProductScreen} />
      <RootStack.Screen name="ViewAll" component={ViewAllScreen} />
      <RootStack.Screen name="Watchlist" component={Watchlist} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
