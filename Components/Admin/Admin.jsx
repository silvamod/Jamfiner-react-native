import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersTable from './UsersTable';
import HomeTableScreen from './HomeTableScreen';
const Stack = createStackNavigator();

function MyStack() {
  return (

    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeTableScreen" component={HomeTableScreen} />
      <Stack.Screen name="UsersTable" component={UsersTable} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}


export default function Admin() {
  return (
    <NavigationContainer independent={true}>
      <MyStack />
    </NavigationContainer>
  )
}