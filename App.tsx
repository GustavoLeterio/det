import { StatusBar } from "expo-status-bar";
import { store } from "./src/Store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeStackNavigator from "./src/HomeStackNavigator/HomeStackNavigator";

export const App = () => {
 
  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <HomeStackNavigator />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

export default App;
