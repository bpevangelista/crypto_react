export const FETCH_MARKETS_PENDING = 'FETCH_MARKETS_PENDING';
export const FETCH_MARKETS_FULFILLED = 'FETCH_MARKETS_FULFILLED';
export const FETCH_MARKET_DETAILS_PENDING = 'FETCH_MARKET_DETAILS_PENDING';
export const FETCH_MARKET_DETAILS_FULFILLED = 'FETCH_MARKET_DETAILS_FULFILLED';
export const FETCH_ERROR = 'FETCH_ERROR';

const fetchMarketsError = (err) => ({
  type: FETCH_ERROR,
  payload: err
});

const fetchMarketsPending = () => ({
  type: FETCH_MARKETS_PENDING,
});

const fetchMarketsFulfilled = (resultArray) => ({
  type: FETCH_MARKETS_FULFILLED,
  payload: resultArray
});

export const fetchMarkets = () => {
  return (dispatch) => {
    dispatch(fetchMarketsPending());

    //let response = await fetch('https://api.coinmarketcap.com/v1/ticker/');
    //let results = await response.json();
    fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then((response) => response.json())
    .then((resultsArray) => {
      dispatch(fetchMarketsFulfilled(resultsArray));
      //dispatch(fetchMarketsFulfilled([]));
    })
    .catch((err) => {
      dispatch(fetchMarketsError(err));
    });
  }
}

const fetchMarketDetailsPending = (basicItem) => ({
  type: FETCH_MARKET_DETAILS_PENDING,
  payload: basicItem
});

const fetchMarketDetailsFulfilled = (completeItem) => ({
  type: FETCH_MARKET_DETAILS_FULFILLED,
  payload: completeItem
});

export const showMarketDetails = (item) => {
  return (dispatch) => {
    dispatch(fetchMarketDetailsPending(item));

    // fetch it using item.id
    let blobTest = {
      "key": "bitcoin", "id": "bitcoin", "name": "Bitcoin", "symbol": "BTC", "rank": "1", "price_usd": "11305.2",
      "price_btc": "1.0", "24h_volume_usd": "13947800000.0", "market_cap_usd": "190058070722", "percent_change_1h": "0.99", "percent_change_24h": "-2.11", "percent_change_7d": "-17.14", "last_updated": "1516335565",
      "color": "powderblue",
    };

    dispatch(fetchMarketDetailsFulfilled(blobTest));
  };
};
