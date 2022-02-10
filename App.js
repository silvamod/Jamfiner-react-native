import { StatusBar } from 'expo-status-bar';
import { useState , useEffect} from 'react';
import { StyleSheet, View,Text } from 'react-native';
import Login from './Components/Login/Login'
import Navbar from './Components/Nav/Navbar';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [isLogin, setisLogin] = useState(1);
  const [username, setUsername] = useState('');



  return (
    <>
<NavigationContainer>
      <StatusBar style="auto" />
      {isLogin ? 
      <View style={styles.container}>
      <Login style={styles.loginview} userAuthOK={setisLogin} upDateUserName={setUsername}/>
      </View>
      : 
      <Navbar username={username}/>  
            //TODO: Pass to the navbar the user info to load
      //          after from SQL all the data about him
      }
</NavigationContainer>

      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#c4ff61',
    //  marginTop:20,
  },
  logBTN:{
    paddingBottom:'50px',
  },
  loginview:{
    flex:0.5,
  }
});
