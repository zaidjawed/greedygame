import { createSelector } from 'reselect';
const selectApp = (state) => state;

export const getRowList = () => createSelector(selectApp, (appState) => appState.get('row').toJS());

export const getColumnList = () => createSelector(selectApp, (appState) => appState.get('column').toJS());