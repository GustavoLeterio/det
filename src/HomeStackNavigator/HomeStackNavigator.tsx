import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginTab } from "../tabs/Login/LoginTab";
import { Text, View } from "react-native";
import { HomeTab } from "../tabs/Home/HomeTab";

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
      </Navigator>
    </NavigationContainer>
  );
}