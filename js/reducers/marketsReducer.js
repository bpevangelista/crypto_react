import * as actions from '../actions/actions'
import { MarketSortTypes } from '../types';

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

const sortMarketItems = (
  items : Array<MarketItemType>,
  filterAndSort: MarketsFilterAndSortType) : Array<MarketItemType> => {

  let newItems = items.slice();
  switch (filterAndSort.sortType) {
    case MarketSortTypes.rank:
      newItems.sort((left, right) => {
        return left.rank - right.rank;
      });
      break;
    case MarketSortTypes.change:
      newItems.sort((left, right) => {
        return right.percent_change_24h - left.percent_change_24h;
      });
      break;
    case MarketSortTypes.volume:
      newItems.sort((left, right) => {
        return right['24h_volume_usd'] - left['24h_volume_usd'];
      });
      break;
  }

  return newItems;
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

      // Parse items from str
      item.rank = parseInt(item.rank);
      item.percent_change_24h = parseFloat(item.percent_change_24h);
      item['24h_volume_usd'] = parseFloat(item['24h_volume_usd']);
      results.push(item);
    }
  }

  return sortMarketItems(results, filterAndSort);
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

    case actions.SORT_MARKETS:
      newState = Object.assign({}, state, {
        filterAndSort: action.payload,
        items: sortMarketItems(state.items, action.payload),
      });
    break;
  }

  return newState || state;
}

export default marketsReducer;
