import React, { useEffect, useState } from "react";
import { parseStockData } from "../components/ChartData";
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Dimensions } from "react-native";
import axios from "axios";
import ChartData from "../components/ChartData";
import { LineChart } from "react-native-chart-kit";
import TopBar from "../components/TopBar";

import WatchlistModal from "../components/WatchlistModel";

const screenWidth = Dimensions.get("window").width;
 
export default function ProductScreen({ route }) {
  const { symbol } = route.params; // symbol passed from product list
  console.log("symbol",symbol)
  

  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slider,setSlider]=useState(false);
 const rawData = {
    "2025-08-14 19:55:00": { "1. open": "237.4995", "2. high": "237.6000", "3. low": "237.4500", "4. close": "237.5988", "5. volume": "419" },
    "2025-08-14 19:50:00": { "1. open": "237.5000", "2. high": "237.6000", "3. low": "237.4500", "4. close": "237.5000", "5. volume": "1045" },
    "2025-08-14 19:45:00": { "1. open": "237.5884", "2. high": "237.6000", "3. low": "237.4500", "4. close": "237.6000", "5. volume": "1011" },
  };
  const chartData = parseStockData(rawData);
  const { width } = Dimensions.get('window');
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch company info
        const res = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`);

        console.log("res",res.data)

        setCompanyData(res.data);

        // Fetch historical prices for chart
        const chartRes = await axios.get(`https://your-api.com/company-chart?symbol=${symbol}`);
        const prices = chartRes.data.map(item => parseFloat(item.close));
        // setChartData(prices);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [symbol]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!companyData) {
    return (
      <View style={styles.loader}>
        <Text>Failed to load data</Text>
      </View>
    );
  }

  return (
    <>
    <ScrollView style={styles.container}>
      {/* Header */}
      <TopBar title={'ProductScreen'} icon={'bookmark'} inputSearch={null} setInputSearch={null} setSlider={setSlider}/>
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://logo.clearbit.com/${companyData.OfficialSite?.replace("https://", "")}`
          }}
          style={styles.logo}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{companyData.Name}</Text>
          <Text style={styles.subtitle}>
            {companyData.Symbol}, {companyData.AssetType}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.price}>${companyData.AnalystTargetPrice}</Text>
          <Text style={styles.change}>
            +{(companyData.QuarterlyRevenueGrowthYOY * 100).toFixed(2)}%
          </Text>
        </View>
      </View>
     <Text style={styles.title}>Stock Price Line Chart</Text>
     <ChartData data={chartData} width={width - 100} height={250} />
      {/* About */}
      <Text style={styles.sectionTitle}>About {companyData?.Name}</Text>
      <Text style={styles.description}>{companyData?.Description}</Text>


      <View style={styles.statsGrid}> 
        <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:'space-between'}}>
        <Text style={[styles.stat,styles.statSec]}><Text style={styles.statLabel}>Sector:</Text> {companyData?.Sector}</Text>
        <Text style={[styles.stat,styles.statSec]}><Text style={styles.statLabel}>Industry:</Text> {companyData?.Industry}</Text>
        </View>
        <Text style={styles.stat}><Text style={styles.statLabel}>52W High:</Text> ${companyData?.["52WeekHigh"]}</Text>
        <Text style={styles.stat}><Text style={styles.statLabel}>52W Low:</Text> ${companyData?.["52WeekLow"]}</Text>
        <Text style={styles.stat}><Text style={styles.statLabel}>Market Cap:</Text> ${Number(companyData.MarketCapitalization).toLocaleString()}</Text>
        <Text style={styles.stat}><Text style={styles.statLabel}>PE Ratio:</Text> {companyData?.PERatio}</Text>
        <Text style={styles.stat}><Text style={styles.statLabel}>Beta:</Text> {companyData?.Beta}</Text>
        <Text style={styles.stat}><Text style={styles.statLabel}>Dividend Yield:</Text> {(companyData?.DividendYield * 100).toFixed(2)}%</Text>

        <Text style={styles.stat}><Text style={styles.statLabel}>Profit Margin:</Text> {(companyData.ProfitMargin * 100).toFixed(2)}%</Text>
      </View>
      {/* <ChartData symbol={symbol} /> */}

    </ScrollView>
    {/* {slider&& (<WatchlistsSlider isVisible={slider} onClose={()=>setSlider(false)} product={"sdf"}  setStatus={true} onWatchlistUpdate={null} />)} */}
{slider&&<WatchlistModal symbol={symbol}  visible={slider}  setSlider={setSlider} onClose={()=>setSlider(false)} />}


    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  logo: { width: 40, height: 40, borderRadius: 5, marginRight: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666" },
  price: { fontSize: 18, fontWeight: "bold" },
  change: { fontSize: 14, color: "green" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  description: { fontSize: 14, color: "#555", lineHeight: 20 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 ,padding:5,marginBottom:10},
  stat: { width: "50%", fontSize: 14, marginVertical: 5 },
  statSec:{backgroundColor:"#efded4",gap:5,padding:8,borderRadius:20,color:'red'},
  statLabel: { fontWeight: "bold" }
});
