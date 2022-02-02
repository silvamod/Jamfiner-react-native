import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect,useState } from 'react';
// import styles from './Components/Login/Login.css';
import AwesomeButton from "react-native-really-awesome-button";
import  Button from "./Button";
import LoginInput from './LoginInput';
import { auth } from '../DataBaseSDK/firebaseSDK'


export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then (userCredentials => {
        const user = userCredentials.user;
        //  console. log(user.email);
        props.upDateUserName(user.email)
        props.userAuthOK(0) //Switch to the main page
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user; 
        // console. log('Logged in with:', user.email);
        props.upDateUserName(user.email)
        props.userAuthOK(0) //Switch to the main page

      })
      .catch(error => alert(error.message)) //TODO:my own alert
  }
  return (
    <>
    <View>
          <LoginInput lable={'Email'} set={setEmail}/>
          <LoginInput lable={'Password'} set={setPassword}/>
          <Button label={'Login'} handleSignUp={handleLogin}/>
          <Button label={'Register'} handleSignUp={handleSignUp}/>

    </View>
    </>
  );
}

