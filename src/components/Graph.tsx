// import {View, Text} from 'react-native';
// import {LineGraph, GraphPoint} from 'react-native-graph';
// import {colors} from '../theme';
// import timeseries from '../../assets/data/timeSeries.json';
// import axios from 'axios';

// import React, { useEffect,useMemo } from 'react';

// export default function Graph({symbol,GraphData}) {

// //   const points: GraphPoint[] = [
// //     {
// //       date: new Date(2024, 1, 1),
// //       value: 188,
// //     },
// //     {
// //       date: new Date(2024, 1, 2),
// //       value: 193,
// //     },
// //     {
// //       date: new Date(2024, 1, 3),
// //       value: 188,
// //     },
// //     {date: new Date(2025, 1, 4), value: 193},
// //   ];
// //   const graphPoints: GraphPoint[] = timeseries.values.map(value => ({
// //     date: new Date(value.datetime),
// //     value: Number.parseFloat(value.close),
// //   }));

// const graphPoints: GraphPoint[] = useMemo(() => {
//     if (!GraphData) return [];
    
//     return Object.entries(GraphData).map(([datetime, data]) => ({
//       date: new Date(datetime),
//       value: parseFloat(data["4. close"]),
//     }));
//   }, [GraphData])};
//   console.log("Converted graph points:", graphPoints);
//     <View>
//       <Text>Graph</Text>
//       <LineGraph
//         style={{width: '100%', height: 300}}
//         points={graphPoints}
//         animated={false}
//         color={colors.danger}
//       />
//     </View>
//   );
// }
import {View, Text} from 'react-native';
import {LineGraph, GraphPoint} from 'react-native-graph';
import {colors} from '../theme';
import React, { useEffect, useMemo } from 'react';

export default function Graph({symbol, GraphData}) {
  console.log("graphData", GraphData);

  // Convert GraphData to the format expected by LineGraph
  const graphPoints: GraphPoint[] = useMemo(() => {
    if (!GraphData) return [];
    
    return Object.entries(GraphData).map(([datetime, data]) => ({
      date: new Date(datetime),
      value: parseFloat(data["4. close"]),
    }));
  }, [GraphData]);

  console.log("Converted graph points:", graphPoints);

  return (
    <View>
      <Text>Graph for {symbol}</Text>
      <LineGraph
        style={{width: '100%', height: 300}}
        points={graphPoints}
        animated={false}
        color={colors.danger}
      />
    </View>
  );
}