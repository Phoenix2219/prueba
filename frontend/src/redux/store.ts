import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import { testSlice } from "./slices/testSlice"
import { authSlice } from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import configurationReducer from "./slices/configurationSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { usersSlice } from "./slices/usersSlice"

const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [usersSlice.reducerPath]: usersSlice.reducer,
  user: userReducer,
  configuration: configurationReducer,
})

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authSlice.middleware)
      .concat(usersSlice.middleware)
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;