import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, spacing } from '../theme';

export default function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <View style={{ padding: spacing.lg, alignItems: 'center' }}>
      <Text
        style={{
          color: colors.text,
          marginBottom: spacing.sm,
          fontWeight: '700',
        }}
      >
        Something went wrong
      </Text>
      <Pressable
        onPress={onRetry}
        style={{
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderRadius: 10,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.subtext }}>Retry</Text>
      </Pressable>
    </View>
  );
}
