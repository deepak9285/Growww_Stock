import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, spacing } from '../theme';
import { ThemeContext } from '../contexts/themeContext';
export type StockCardProps = {
  symbol: string;
  price: number;
  changePercent: number; 
  onPress?: () => void;
};

export default function StockCard({
  symbol,
  price,
  changePercent,
  onPress,
}: StockCardProps) {
  const isUp = changePercent >= 0;
  const {theme} = React.useContext(ThemeContext);
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        borderRadius: 14,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 16,
          fontWeight: '700',
          marginBottom: spacing.xs,
        }}
      >
        {symbol}
      </Text>
      <Text style={{ color: colors.subtext, marginBottom: spacing.xs }}>
        ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price || '0').toFixed(2)}
      </Text>
      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: isUp ? '#102D1B' : '#3A1C1C',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: isUp ? colors.success : colors.danger,
            fontWeight: '700',
          }}
        >
          {isUp ? '+' : ''}
          {typeof changePercent === 'number' ? changePercent.toFixed(2) : parseFloat(changePercent || '0').toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}
