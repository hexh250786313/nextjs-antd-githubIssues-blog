import { message } from 'antd';
import {
  FETCH_POST_DETAIL_FAIL
} from '../../../constants/ActionTypes';

export default () => next => action => {
  const ret = next(action);
  switch (action.type) {
    case FETCH_POST_DETAIL_FAIL: {
      message.error('Fetch post detail fail');
      break;
    }
    default:
  }
  return ret;
};
