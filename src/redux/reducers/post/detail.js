import {
  FETCH_POST_DETAIL,
  FETCH_POST_DETAIL_FAIL,
  FETCH_POST_DETAIL_SUCCESS,
} from '../../../constants/ActionTypes';

const initialState = {
  detail: {},
};

const detail = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POST_DETAIL:
    case FETCH_POST_DETAIL_FAIL:
      return initialState;
    case FETCH_POST_DETAIL_SUCCESS:
      return {
        ...state,
        detail: payload,
      };
    default:
      return state;
  }
};

export default detail;
