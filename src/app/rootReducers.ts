import { persistCombineReducers } from "redux-persist";
import storage from "./reduxPersistStorage";
import { exampleAPI } from "./APIs/rtkQuery";

const persistWhitelist: Array<keyof typeof rootReducers> = [];

const rootReducers = {
  [exampleAPI.reducerPath]: exampleAPI.reducer,
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: persistWhitelist,
};

const persistedStore = persistCombineReducers(persistConfig, rootReducers);

export default persistedStore;
