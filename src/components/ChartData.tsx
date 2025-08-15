// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, ActivityIndicator } from "react-native";
// import {
//   CandlestickChart,
// } from "react-native-wagmi-charts";

// // Your JSON data
// const rawData = {
//   "Meta Data": {
//     "1. Information": "Intraday (5min) open, high, low, close prices and volume",
//     "2. Symbol": "IBM",
//   },
//   "Time Series (5min)": {
//     "2025-08-13 19:55:00": { "1. open": "240.5500", "2. high": "240.8300", "3. low": "240.5000", "4. close": "240.6000", "5. volume": "711" },
//     "2025-08-13 19:50:00": { "1. open": "240.7900", "2. high": "240.8900", "3. low": "240.5500", "4. close": "240.7300", "5. volume": "131" },
//     "2025-08-13 19:45:00": { "1. open": "240.5600", "2. high": "240.8900", "3. low": "240.5600", "4. close": "240.7900", "5. volume": "210" },

//   }
// };

// export default function ChartData() {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Convert raw API data to CandlestickChart format
//     const timeSeries = rawData["Time Series (5min)"];
//     const formattedData = Object.keys(timeSeries)
//       .map((time) => {
//         const item = timeSeries[time];
//         return {
//           timestamp: new Date(time).getTime(),
//           open: parseFloat(item["1. open"]),
//           high: parseFloat(item["2. high"]),
//           low: parseFloat(item["3. low"]),
//           close: parseFloat(item["4. close"]),
//         };
//       })
//       .sort((a, b) => a.timestamp - b.timestamp); // Sort oldest → newest

//     setChartData(formattedData);
//   }, []);

//   if (chartData.length === 0) {
//     return <ActivityIndicator size="large" style={{ flex: 1 }} />;
//   }

//   return (
//     <View style={styles.container}>
     
//         <CandlestickChart.Provider data={chartData}>
//           <CandlestickChart height={300}>
//             <CandlestickChart.Candles />
//             <CandlestickChart.Crosshair />
//           </CandlestickChart>
//           <CandlestickChart.DatetimeText />
//         </CandlestickChart.Provider>
   
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 50,
//   },
// });
