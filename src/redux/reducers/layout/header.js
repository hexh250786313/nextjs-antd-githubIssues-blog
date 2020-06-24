import { HANDLE_HEADER_CHANGE } from '../../../constants/ActionTypes';

const initialState = {
  pic: 'https://s1.ax1x.com/2020/06/24/NaqXuR.png',
  title: 'title',
};

const header = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_HEADER_CHANGE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default header;
