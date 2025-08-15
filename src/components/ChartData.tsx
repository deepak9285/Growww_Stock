import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Polyline, Circle } from 'react-native-svg';

export const parseStockData = (rawData) => {
  return Object.entries(rawData)
    .map(([timestamp, values]) => ({
      timestamp,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'], 10),
    }))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
};
const LineChart = ({ data, width, height }) => {
  if (!data || data.length === 0) {
    return <Text style={styles.noData}>No data available</Text>;
  }
  const maxVal = Math.max(...data.map(d => d.high));
  const minVal = Math.min(...data.map(d => d.low));
  const priceRange = maxVal - minVal || 1; 
  const linePoints = data
    .map((item, index) => {
      const x = data.length > 1 ? (index / (data.length - 1)) * width : width / 2;
      const y = height - ((item.close - minVal) / priceRange) * height;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPath = `M0,${height} ${linePoints} L${width},${height} Z`;

  return (
    <View style={[styles.chartContainer, { width: width + 50, height }]}>
      {/* Y-axis */}
      <View style={styles.yAxis}>
        <Text style={styles.axisLabel}>{maxVal.toFixed(2)}</Text>
        <Text style={styles.axisLabel}>{(minVal + priceRange / 2).toFixed(2)}</Text>
        <Text style={styles.axisLabel}>{minVal.toFixed(2)}</Text>
      </View>

      {/* Chart */}
      <View style={styles.chart}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="rgba(38, 166, 154, 0.5)" />
              <Stop offset="100%" stopColor="rgba(38, 166, 154, 0)" />
            </LinearGradient>
          </Defs>

          {/* Area fill */}
          <Path d={areaPath} fill="url(#areaGradient)" />

          {/* Price line */}
          <Polyline
            fill="none"
            stroke="#26a69a"
            strokeWidth="2.5"
            points={linePoints}
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x = data.length > 1 ? (index / (data.length - 1)) * width : width / 2;
            const y = height - ((item.close - minVal) / priceRange) * height;
            return (
              <Circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#26a69a"
                stroke="#1e1e1e"
                strokeWidth="2"
              />
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 10,
  },
  yAxis: {
    height: '100%',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  axisLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  chart: {
    flex: 1,
  },
  noData: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default LineChart;
/*


*/