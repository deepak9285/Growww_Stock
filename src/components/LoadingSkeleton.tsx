import React from 'react';
import { View } from 'react-native';
import { colors, spacing } from '../theme';

export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            width: '47.5%',
            height: 90,
            backgroundColor: colors.card,
            borderRadius: 14,
            opacity: 0.6,
          }}
        />
      ))}
    </View>
  );
}
