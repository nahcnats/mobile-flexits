import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

// Import redux reducers
import locationReducer from './store/reducers/location';
import authReducer from './store/reducers/auth';
import clockingReducer from './store/reducers/clocking';

// Import navigation
import AppNavigation from './navigation/AppNavigation';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  clocking: clockingReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts}
      onFinish={() => {
        setFontLoaded(true);
      }}
      onError={console.warn}
    />;
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
