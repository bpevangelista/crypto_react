/* @flow */

export type MarketDetailsType = {
  navigation: {
    state: {
      params: Object
    }
  }
};

export type MarketItemType = {
  id: string,
  rank: string,
  name: string,
  symbol: string,
  price_usd: string,
  percent_change_24h: string,
};

//bittrex.com/api/v1.1/public/getmarkets  (has low/high 24h)
//api.coinmarketcap.com
export type MarketItemDetailsType = {
  id: string,
  rank: string,
  name: string,
  symbol: string,
  price_usd: string,
  price_btc: string,
  percent_change_24h: string,
  percent_change_7d: string,
  '24h_volume_usd': string,
  market_cap_usd: string,
  last_updated: string,
};

/*
"key": "bitcoin", "id": "bitcoin", "name": "Bitcoin", "symbol": "BTC", "rank": "1", "price_usd": "11305.2",
"price_btc": "1.0", "24h_volume_usd": "13947800000.0", "market_cap_usd": "190058070722",
"percent_change_1h": "0.99", "percent_change_24h": "-2.11",
"percent_change_7d": "-17.14", "last_updated": "1516335565",
"color": "powderblue",
*/
