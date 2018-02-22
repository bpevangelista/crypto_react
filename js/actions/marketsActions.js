export const FETCH_MARKETS_PENDING = 'FETCH_MARKETS_PENDING';
export const FETCH_MARKETS_FULFILLED = 'FETCH_MARKETS_FULFILLED';
export const FETCH_MARKETS_ERROR = 'FETCH_MARKETS_ERROR';
export const FETCH_MARKET_DETAILS_PENDING = 'FETCH_MARKET_DETAILS_PENDING';
export const FETCH_MARKET_DETAILS_FULFILLED = 'FETCH_MARKET_DETAILS_FULFILLED';
export const FILTER_AND_SORT_MARKETS = 'FILTER_AND_SORT_MARKETS';

const fetchMarketsError = (err) => ({
  type: FETCH_MARKETS_ERROR,
  payload: err
});

const fetchMarketsPending = () => ({
  type: FETCH_MARKETS_PENDING,
});

const fetchMarketsFulfilled = (resultArray) => ({
  type: FETCH_MARKETS_FULFILLED,
  payload: resultArray
});

const fetchMarketDetailsPending = (basicItem) => ({
  type: FETCH_MARKET_DETAILS_PENDING,
  payload: basicItem
});

const fetchMarketDetailsFulfilled = (completeItem) => ({
  type: FETCH_MARKET_DETAILS_FULFILLED,
  payload: completeItem
});


// Exported
// --------------------------------------------------------------------------------
export const filterAndSortMarkets = (filterAndSort : MarketsFilterAndSortType) => ({
  type: FILTER_AND_SORT_MARKETS,
  payload: filterAndSort,
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

export const showMarketDetails = (item) => {
  return (dispatch) => {
    dispatch(fetchMarketDetailsPending(item));

    // TODO fetch details and history

    dispatch(fetchMarketDetailsFulfilled(item));
  };
};
