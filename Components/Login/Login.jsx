import { View,Image,Text,Button} from 'react-native';
import React, { useState } from 'react';
// import styles from './Components/Login/Login.css';
import  MyButton from "./Button";
import LoginInput from './LoginInput';
import { auth } from '../DataBaseSDK/firebaseSDK'
import SingUp from './SignUp'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@email', value)
      } catch (e) {
        console.log(e)
      }
    }
  

  // const handleSignUp = () => {
    
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then (userCredentials => {
  //       const user = userCredentials.user;
  //       //  console. log(user.email);
  //       props.upDateUserName(user.email)
  //       props.userAuthOK(0) //Switch to the main page
  //       storeData(email)
  //     })
  //     .catch(error => alert(error.message))
  // }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user; 
        // console. log('Logged in with:', user.email);
        props.upDateUserName(user.email)
        props.userAuthOK(0) //Switch to the main page
        storeData(email)
      })

      .catch(error => alert(error.message)) //TODO:my own alert
  }
  return (
    
 
    <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:'#90E0EF'}}>
    <View style={{flex:0.3,alignContent:'center',justifyContent:'center'}}>
    <Image style={{width:'100%',height:50,marginTop:50}} source={require('../../assets/images/logo-removebg-preview__3_-removebg-preview.png')}/>
    </View>
    <View style={{flex:0.7,display:'flex',alignItems:'center' ,justifyContent:'center'}}>
          <LoginInput lable={'Email'} set={setEmail}/>  
          <LoginInput lable={'Password'} pass={true} set={setPassword}/>
          <MyButton label={'Login'} size={150} onP={handleLogin}/>

          <View style={{display:'flex',flexDirection:'row',alignItems:'baseline'}}>
          </View>
    </View>
  </View>

   
  );
}

