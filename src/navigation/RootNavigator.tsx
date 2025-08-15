import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLayout from '../screens/AppLayout';
import ProductScreen from '../screens/ProductScreen';
import ViewAllScreen from '../screens/ViewAllScreen';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <RootStack.Screen name="Home" component={AppLayout} />
      <RootStack.Screen name="Product" component={ProductScreen} />
      <RootStack.Screen name="ViewAll" component={ViewAllScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
