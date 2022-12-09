import {
  GET_ROW,
  SET_COLUMN
} from '../constants/app';

//==============================================
// QUESTION
//==============================================

export const getRow = (data) => ({
  type: GET_ROW,
  data: data
})

export const setColumn = (data) => ({
  type: SET_COLUMN,
  data: data
})