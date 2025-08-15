import client from './client';
import { ALPHA_VANTAGE_API_KEY } from '../config/env';

// Types
export type StockMover = {
  symbol: string;
  price: number;
  changePercent: number;
};

export type CompanyOverview = {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  DividendYield: string;
  PERatio: string;
};

function isMockMode() {
  return !ALPHA_VANTAGE_API_KEY || ALPHA_VANTAGE_API_KEY === '0891QCPUCG9GPJTT';
}
export async function getTopGainersLosers(): Promise<{
  gainers: StockMover[];
  losers: StockMover[];
}> {
  if (isMockMode()) {
    return {
      gainers: [

      ],
      losers: [

      ],
    };
  }


  const { data } = await client.get('', { params: { function: 'TOP_GAINERS_LOSERS', apikey: ALPHA_VANTAGE_API_KEY } });
  // console.log("data",data);
  const gainers = (data?.top_gainers || [])
    .slice(0, 20)
    .map((it: any) => ({
      symbol: it.ticker || it.symbol,
      price: parseFloat(it.price || '0'),
      changePercent: parseFloat((it.change_percentage || '0').replace('%', '')),
    }));

  const losers = (data?.top_losers || [])
    .slice(0, 20)
    .map((it: any) => ({
      symbol: it.ticker || it.symbol,
      price: parseFloat(it.price || '0'),
      changePercent: parseFloat((it.change_percentage || '0').replace('%', '')),
    }));

  return { gainers, losers };
}


// ------------------ Company Overview ------------------
export async function getCompanyOverview(symbol: string): Promise<CompanyOverview> {
  if (isMockMode()) {
    return {
      Symbol: symbol,
      AssetType: 'Stock',
      Name: 'Mock Company',
      Description: 'This is a mock description for demo purposes.',
      Sector: 'Technology',
      Industry: 'Software',
      MarketCapitalization: '2500000000000',
      DividendYield: '0.6',
      PERatio: '35.2',
    };
  }

  const { data } = await client.get('', {
    params: { function: 'OVERVIEW', symbol },
  });
  return data;
}

// ------------------ Symbol Search ------------------
export async function searchSymbols(query: string) {
  if (isMockMode()) {
    return [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
    ];
  }

  const { data } = await client.get('', {
    params: { function: 'SYMBOL_SEARCH', keywords: query },
  });

  return (data.bestMatches || []).map((m: any) => ({
    symbol: m['1. symbol'],
    name: m['2. name'],
  }));
}

// ------------------ Daily Time Series ------------------
export async function getDailySeries(symbol: string) {
  if (isMockMode()) {
    const today = new Date();
    return Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      return {
        x: d,
        y: Math.random() * 100 + 100,
      };
    }).reverse();
  }

  const { data } = await client.get('', {
    params: { function: 'TIME_SERIES_DAILY', symbol, outputsize: 'compact' },
  });

  const series = data['Time Series (Daily)'] || {};
  return Object.entries(series)
    .map(([date, o]: any) => ({
      x: new Date(date),
      y: parseFloat(o['4. close']),
    }))
    .sort((a, b) => a.x.getTime() - b.x.getTime());
}
