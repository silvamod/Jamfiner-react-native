import { StatusBar } from 'expo-status-bar';
import { useState , useEffect} from 'react';
import { StyleSheet, View,Text } from 'react-native';
import Login from './Components/Login/Login'
import Navbar from './Components/Nav/Navbar';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [isLogin, setisLogin] = useState(0);
  const [username, setUsername] = useState('msigfrid9@telegraph.co.uk');
//  apiUrl = 'https://localhost:44311/api/User?email='+username
  // useEffect(() => {
  //    let apiUrl = 'https://localhost:44311/api/user?email='+username
  //   fetch(apiUrl, {
  //     method: 'GET',
  //     headers: new Headers({
  //       'Content-Type': 'application/json; charset=UTF-8',
  //       'Accept': 'application/json; charset=UTF-8'
  //     })
  //   })
  //     .then(res => {
  //       console.log('res=', res);
  //       console.log('res.status', res.status);
  //       console.log('res.ok', res.ok);
  //       return res.json()
  //     })
  //     .then(
  //       (result) => {
  //         console.log("fetch btnFetchGetStudents= ", result);
  //         result.map(st => console.log(st.Name));
  //         console.log('result[0].Name=', result[0].Name);
  //       },
  //       (error) => {
  //         console.log("err get=", error);
  //       });

  // }, []);


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
