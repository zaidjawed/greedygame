import { takeLatest, all, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_ROW,
  SET_ROW,
} from '../constants/app';

function* getRow(action) {
  try {
    let res = yield axios.get(`https://go-dev.greedygame.com/v3/dummy/report?startDate=${action.data.startDate}&endDate=${action.data.endDate}`);
    yield put({ type: SET_ROW, data: res.data.data });
  } catch (e) {
    console.log(e);
  }
}

export default function* appSaga() {
  yield all([yield takeLatest(GET_ROW, getRow)]);
}