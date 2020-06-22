import { HANDLE_SEARCH_TEXT_CHANGE } from '../../../constants/ActionTypes';

const initialState = {
  searchText: 'niubi',
};

const search = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_SEARCH_TEXT_CHANGE:
      return {
        ...state,
        searchText: payload.searchText,
      };
    default:
      return state;
  }
};

export default search;
