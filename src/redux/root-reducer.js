import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['navigation'],
  // whitelist: ['auth', 'notes'],
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
