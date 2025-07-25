import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import authReducer from "./reducers/auth";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["authReducer"],
  // whitelist: ['authReducer'],
};
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["infoCustomer"], // hoặc đơn giản là không dùng persist ở auth luôn
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // bỏ qua các action của redux-persist
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
