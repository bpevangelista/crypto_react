import * as actions from '../actions/actions'

const defaultState = {
  _allItems: [],
  items: [],
  itemDetails: null,
  refreshing: false,
  filterAndSort: {
    sortType: 0,
    filterType: 0,
    filterText: '',
  }
};

const filterAndSortMarketItems = (
  items : Array<MarketItemType>,
  filterAndSort: MarketsFilterAndSortType) : Array<MarketItemType> => {

  let results = [];
  if (!items) {
    return results;
  }

  let filterText = filterAndSort.filterText.toLowerCase();
  for (let i = 0; i < items.length; ++i) {
    let item = items[i];
    if (item.name.toLowerCase().includes(filterText)) {
      results.push(item);
    }
  }

  return results;
};

const marketsReducer = (state : MarketsStoreType = defaultState, action) => {
  let newState = null;

  switch (action.type) {
    case actions.FETCH_MARKETS_PENDING:
      newState = Object.assign({}, state, {
        refreshing: true
      });
    break;

    case actions.FETCH_MARKETS_FULFILLED:
      newState = Object.assign({}, state, {
        _allItems: action.payload,
        items: filterAndSortMarketItems(action.payload, state.filterAndSort),
        refreshing: false
      });
    break;

    case actions.FETCH_MARKETS_ERROR:
      newState = Object.assign({}, state, {
        refreshing: false
      });
    break;

    // TODO e.g. completeItem = false
    case actions.FETCH_MARKET_DETAILS_PENDING:
      newState = Object.assign({}, state, {
        itemDetails: action.payload
      });
    break;

    // TODO e.g. completeItem = true
    case actions.FETCH_MARKET_DETAILS_FULFILLED:
      newState = Object.assign({}, state, {
        itemDetails: action.payload
      });
    break;

    case actions.FILTER_AND_SORT_MARKETS:
      newState = Object.assign({}, state, {
        filterAndSort: action.payload,
        items: filterAndSortMarketItems(state._allItems, action.payload),
      });
    break;
  }

  return newState || state;
}

export default marketsReducer;
