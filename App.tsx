import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { store } from "./src/Store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeStackNavigator from "./src/HomeStackNavigator/HomeStackNavigator";

export const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView>
          <StatusBar />
          <HomeStackNavigator/>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
