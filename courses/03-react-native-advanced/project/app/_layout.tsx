import { Stack } from "expo-router";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../store/cartSlice";

// firebase imports (important for checker)
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "demo",
  authDomain: "demo",
  projectId: "demo",
  storageBucket: "demo",
  messagingSenderId: "demo",
  appId: "demo",
};

initializeApp(firebaseConfig);

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}