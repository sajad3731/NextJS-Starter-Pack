import {
  configureStore,
  ThunkAction,
  Action,
  EnhancedStore,
  MiddlewareArray,
  DeepPartial,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import persistedStore from "./rootReducers";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { useMemo } from "react";
import { exampleAPI } from "./APIs/rtkQuery";

type storeType = EnhancedStore<
  ReturnType<typeof persistedStore> & PersistPartial,
  Action<any>,
  MiddlewareArray<any>
>;

type makeStoreType = (
  initialState?: DeepPartial<unknown> | undefined
) => storeType;

let store: storeType | undefined;

const makeStore: makeStoreType = (initialState = {}) => {
  return configureStore({
    reducer: persistedStore,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(exampleAPI.middleware),
    devTools: process.env.NODE_ENV === "development",
  });
};

export const initializeStore: makeStoreType = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

store && setupListeners(store.dispatch);

//* ReturnType" set type based on returned value from function
export type AppDispatch = storeType["dispatch"];
export type RootState = ReturnType<storeType["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useStore: typeof makeStore = (initialState) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};
