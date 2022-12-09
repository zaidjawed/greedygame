import { fromJS } from 'immutable';

import {
  SET_ROW,
  SET_COLUMN
} from '../constants/app';

const initialState = fromJS({
  row: [],
  column: fromJS([
    {label: "Date", value: "date", show: true},
    {label: "App", value: "app_id", show: true},
    {label: "Requests", value: "requests", show: true},
    {label: "Responses", value: "responses", show: true},
    {label: "Impressions", value: "impressions", show: true},
    {label: "Clicks", value: "clicks", show: true},
    {label: "Revenue", value: "revenue", show: true},
    {label: "Fill Rate", value: "fill_rate", show: true},
    {label: "CTR", value: "ctr", show: true},
  ])
})

const AppReducer = (state = initialState, action) => {
	switch (action.type) {    
    case SET_ROW:
      return state
      .set('row', fromJS(action.data));

    case SET_COLUMN:
      return state
      .set('column', fromJS(action.data));

    default:
      return state;
  }
};

export default AppReducer;