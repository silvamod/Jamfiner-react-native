import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatLs from './ChatLs';
import Chat from './Chat';


const Stack = createNativeStackNavigator();
const UsernameContext = React.createContext();
export default function ChatNav(props){
 
  return (  
   
    <NavigationContainer    independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Inbox"
          // children={()=><ChatLs username={props.username} navigation = {props.navigation}/>}
           component={ChatLs}
           //options={{username:props.username}}
           //initialParams={{ username:props.username}}
        />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
};