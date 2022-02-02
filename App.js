import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import Login from './Components/Login/Login'
import Navbar from './Components/Nav/Navbar';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isLogin, setisLogin] = useState(0);
  const [username, setUsername] = useState('');




  return (
    
      <NavigationContainer>
      <StatusBar style="auto" />
      {isLogin ? <View style={styles.container}><Login userAuthOK={setisLogin} upDateUserName={setUsername}/></View>: 
      <Navbar username={username}/>  
            //TODO: Pass to the navbar the user info (user.email) to load
      //          after from SQL all the data about him
      }
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#1db954',
     justifyContent: 'center',
  },
  logBTN:{
    paddingBottom:'50px',
  },
});
