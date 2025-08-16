import React, { useEffect, useState,useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator} from "react-native";
import axios from "axios";
import TopBar from "../components/TopBar";
import { useWatchlists } from "../store/watchlists";
import WatchlistModal from "../components/WatchlistModel";
import {ThemeContext} from '../contexts/themeContext';
import { useNavigation } from "@react-navigation/native";
import Graph from "../components/Graph";
export default function ProductScreen({ route }) {
  const { symbol } = route.params; 
 const[inWatchlist,setInWatchlist]=useState(false);
   const {isInAnyList}=useWatchlists();
   const{theme}=useContext(ThemeContext);
   useEffect(() => {
    setInWatchlist(isInAnyList(symbol));
  }, [symbol, isInAnyList]);
  const nav=useNavigation();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slider,setSlider]=useState(false);
  const [GraphData,setGraphData]=useState(null);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=0891QCPUCG9GPJTT`);
        setCompanyData(res.data);
        const chartRes = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=0891QCPUCG9GPJTT`);
         setGraphData(chartRes.data['Time Series (5min)']);
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
    <ScrollView style={[styles.container,{backgroundColor:theme.background}]}>
      <TopBar title={'ProductScreen'} icon={'bookmark'} symbol={symbol} inputSearch={null} setInputSearch={null} setSlider={setSlider}/>
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://logo.clearbit.com/${companyData.OfficialSite?.replace("https://", "")}`
          }}
          style={styles.logo}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title,{color:theme.text}]}>{companyData.Name}</Text>
          <Text style={[styles.subtitle,{color:theme.text}]}>
            {companyData.Symbol}, {companyData.AssetType}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.price,{color:theme.text}]}>${companyData.AnalystTargetPrice}</Text>
          <Text style={styles.change}>
            +{(companyData.QuarterlyRevenueGrowthYOY * 100).toFixed(2)}%
          </Text>
        </View>
      </View>
     <Text style={[styles.title,{color:theme.text}]}>Stock Price Line Chart</Text>
      <Graph symbol={symbol} GraphData={GraphData}/>
      <Text style={[styles.sectionTitle,{color:theme.text}]}>About {companyData?.Name}</Text>
      <Text style={[styles.description,{color:theme.text}]}>{companyData?.Description}</Text>


      <View style={styles.statsGrid}> 
        <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:'space-between'}}>
        <Text style={[styles.stat,styles.statSec,{color:theme.text,backgroundColor:theme.danger}]}><Text style={styles.statLabel}>Sector:</Text> {companyData?.Sector}</Text>
        <Text style={[styles.stat,styles.statSec,{color:theme.text,backgroundColor:theme.danger}]}><Text style={styles.statLabel}>Industry:</Text> {companyData?.Industry}</Text>
        </View>
        <Text style={[styles.stat,{color:theme.text}]}><Text style={styles.statLabel}>52W High:</Text> ${companyData?.["52WeekHigh"]}</Text>
        <Text style={[styles.stat,{color:theme.text}]}><Text style={styles.statLabel}>52W Low:</Text> ${companyData?.["52WeekLow"]}</Text>
        <Text style={[styles.stat,{color:theme.text}]}><Text style={styles.statLabel}>Market Cap:</Text> ${Number(companyData.MarketCapitalization).toLocaleString()}</Text>
        <Text style={[styles.stat,{color:theme.text}]}><Text style={styles.statLabel}>PE Ratio:</Text> {companyData?.PERatio}</Text>
        <Text style={[styles.stat,{color:theme.text}]}><Text style={styles.statLabel}>Beta:</Text> {companyData?.Beta}</Text>
        <Text style={[styles.stat,{color:theme.text}]}><Text style={styles.statLabel}>Dividend Yield:</Text> {(companyData?.DividendYield * 100).toFixed(2)}%</Text>

        <Text style={[styles.stat,{color:theme.text}]}><Text style={styles.statLabel}>Profit Margin:</Text> {(companyData.ProfitMargin * 100).toFixed(2)}%</Text>
      </View>
  

    </ScrollView>
   {slider&&<WatchlistModal symbol={symbol}  visible={slider} setInWatchlist={setInWatchlist}  setSlider={setSlider} onClose={()=>setSlider(false)} />}


    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
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
  statSec:{gap:5,padding:8,borderRadius:20,color:'red'},
  statLabel: { fontWeight: "bold" }
});
