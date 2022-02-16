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
          headerShown:false
        }}
      />
      <Stack.Screen
        name="SingUp"
        component={SingUp}
        options={{
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
      />
    </Stack.Navigator>
  );
}

