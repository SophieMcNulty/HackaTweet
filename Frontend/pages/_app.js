import '../styles/globals.css';
import Head from 'next/head';

import { Provider, useStore } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import user from "../reducers/users"

const reducers = combineReducers({ user });
const persistConfig = { key: 'hackatweet', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <Head>
          <title>Hackatweet</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>

  );
}

export default App;
