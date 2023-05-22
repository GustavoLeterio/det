import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeTab } from "../tabs/Home/HomeTab";
import { PlateTab } from "../tabs/Plate/PlateTab";
import { OrdersTab } from "../tabs/Orders/OrdersTab";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  const { Navigator, Screen } = Stack;

  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false
      }}>
        {/* <Screen name="Login" component={LoginTab} /> */}
        <Screen name="Home" component={HomeTab} />
        <Screen name="Plate" component={PlateTab} />
        <Screen name="Orders" component={OrdersTab} />
      </Navigator>
    </NavigationContainer>
  );
}