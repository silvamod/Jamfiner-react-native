import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SingUp from './SignUp';
import FrontScreen from './FrontScreen';
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
        component={FrontScreen}
        options={{
          headerBackground:'#90E0EF',
          headerShown:false
        }}
      />
      <Stack.Screen
        name="SingUp"
        // component={SingUp}
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
        // component={Login}
        children={()=><Login userAuthOK={props.userAuthOK} upDateUserName={props.upDateUserName}/>}
        // initialParams={{
        //   userAuthOK:props.userAuthOK,
        //   upDateUserName:props.upDateUserName
        // }}
        options={{          headerStyle: {
          backgroundColor: '#90E0EF',
        },}}
      />
    </Stack.Navigator>
  );
}

