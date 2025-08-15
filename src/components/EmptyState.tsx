import React from 'react';
import { View, Text } from 'react-native';
import { colors, spacing } from '../theme';

export default function EmptyState({ message }: { message: string }) {
  return (
    <View style={{ padding: spacing.lg, alignItems: 'center' }}>
      <Text style={{ color: colors.subtext }}>{message}</Text>
    </View>
  );
}
