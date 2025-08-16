

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {useWatchlists} from './src/store/watchlists';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { ThemeProvider } from './src/contexts/themeContext';

export default function App() {
  const {hydrate} = useWatchlists();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <ThemeProvider>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <RootNavigator />
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
