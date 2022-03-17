import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersTable from './UsersTable';
const Stack = createStackNavigator();

function MyStack() {
  return (

    <Stack.Navigator independent={true}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UsersTable" component={UsersTable} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button icon="account-details" mode="contained" onPress={() => navigation.navigate('UsersTable')}>
            Users Table
        </Button>
        <Button icon="thumb-up" mode="contained" onPress={() => console.log('Pressed')}>
            Likes Table
        </Button>
        <Button icon="human-male-male" mode="contained" onPress={() => console.log('Pressed')}>
            Matches Table
        </Button>
      </View>
    );
  }

export default function Admin() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}