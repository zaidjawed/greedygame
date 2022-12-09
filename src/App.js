import React from 'react';
import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer from './reducers/app';
import appSaga from './sagas/app';

import Analytics from './pages/Analytics';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
})

sagaMiddleware.run(appSaga);

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Analytics />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;