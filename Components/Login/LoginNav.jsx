import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SingUp from './SignUp';
import FrontScreen from './FrontScreen';
import SpotifyLogin from './SpotifyLogin';
import React from 'react'

const Stack = createStackNavigator();

export default function LoginNav(props) {
  // alert(props.userAuthOK)
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
    >
      <Stack.Screen
        name="Welcome"
        children={()=><FrontScreen userAuthOK={props.userAuthOK} upDateUserName={props.upDateUserName}/>}
        options={{          headerStyle: {
          backgroundColor: '#90E0EF',
        },}}
      />
      <Stack.Screen
        name="SingUp"
        children={()=><SingUp userAuthOK={props.userAuthOK} upDateUserName={props.upDateUserName}/>}
        options={{
          headerStyle: {
            backgroundColor: '#90E0EF',
          },
          title: 'Sing Up',
        }}
      />
      <Stack.Screen
        name="Login"
        children={()=><Login userAuthOK={props.userAuthOK} upDateUserName={props.upDateUserName}/>}
        options={{          headerStyle: {
          backgroundColor: '#90E0EF',
        },}}
      />

<Stack.Screen
        name="SpotifyLogin"
        children={()=><SpotifyLogin userAuthOK={props.userAuthOK} upDateUserName={props.upDateUserName}/>}
        options={{          headerStyle: {
          backgroundColor: '#90E0EF',
        },}}
      />
    </Stack.Navigator>
  );
}

