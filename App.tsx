import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { store } from "./src/Store";
import { Provider } from "react-redux";
import { LoginTab } from "./src/tabs/home/LoginTab";
import {
  useFonts,
  Roboto_400Regular as font
} from "@expo-google-fonts/roboto";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView>
          <StatusBar />
          <LoginTab />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
