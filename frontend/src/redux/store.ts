import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { usersSlice } from "./slices/usersSlice";
import { coursesSlice } from "./slices/coursesSlice";
import userReducer from "./slices/userSlice";
import configurationReducer from "./slices/configurationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [usersSlice.reducerPath]: usersSlice.reducer,
  [coursesSlice.reducerPath]: coursesSlice.reducer,
  user: userReducer,
  configuration: configurationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user", "configuration"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authSlice.middleware)
      .concat(usersSlice.middleware)
      .concat(coursesSlice.middleware),
});

export const persistor = persistStore(store);

// Tipado (si usas TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
