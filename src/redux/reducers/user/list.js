import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
  FETCH_ISSUES_LIST_FAIL,
  FETCH_ISSUES_LIST_SUCCESS,
} from '../../../constants/ActionTypes';

const initialState = {
  list: [],
  issuesList: [],
};

const list = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_LIST:
    case FETCH_USER_LIST_FAIL:
    case FETCH_ISSUES_LIST_FAIL:
      return initialState;
    case FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        list: payload,
      };
    case FETCH_ISSUES_LIST_SUCCESS:
      return {
        ...state,
        issuesList: payload,
      };
    default:
      return state;
  }
};

export default list;
