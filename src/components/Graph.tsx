import {View, Text} from 'react-native';
import {
  LineGraph,
  GraphPoint,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-graph';
import {colors} from '../theme';
import React, {useMemo} from 'react';

export default function Graph({symbol, GraphData}) {
  const graphPoints: GraphPoint[] = useMemo(() => {
    if (!GraphData) return [];

    return Object.entries(GraphData)
      .map(([datetime, data]) => ({
        date: new Date(datetime),
        value: parseFloat(data['4. close']),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [GraphData]);
  return (
    <View>
      <Text>Graph for {symbol}</Text>
      <LineGraph
        style={{width: '100%', height: 300}}
        points={graphPoints}
        animated={false}
        color={colors.danger}
        TopAxisLabel={() => <AxisLabel x={max.x} value={max.value} />}
       BottomAxisLabel={() => <AxisLabel x={min.x} value={min.value} />}
      >
      </LineGraph>
    </View>
  );
}
