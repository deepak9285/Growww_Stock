import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, spacing } from '../theme';

type Props = { title: string; onViewAll?: () => void };

export default function SectionHeader({ title, onViewAll }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>
        {title}
      </Text>
      {onViewAll ? (
        <Pressable
          onPress={onViewAll}
          style={{
            paddingHorizontal: spacing.sm,
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: colors.subtext, fontWeight: '600' }}>
            View All
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
