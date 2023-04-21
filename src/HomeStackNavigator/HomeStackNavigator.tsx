import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginTab } from "../tabs/home/LoginTab";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  const { Navigator, Screen } = Stack;

  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false
      }}>
        <Screen name="Login" component={LoginTab} />
        <Screen name="Teste" component={Teste} />
      </Navigator>
    </NavigationContainer>
  );
}

function Teste({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
      <Text>teste</Text>
    </View>
  );
};
