import React from 'react';
import { View, Text } from 'react-native';
import { colors, spacing } from '../theme';
import { ThemeContext } from '../contexts/themeContext';


export default function EmptyState({ message }: { message: string }) {
  const{theme} = React.useContext(ThemeContext);
  return (
    <View style={{ padding: spacing.lg, alignItems: 'center' }}>
      <Text style={{ color: theme.subtext }}>{message}</Text>
    </View>
  );
}
