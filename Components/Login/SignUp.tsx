
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View ,Image} from "react-native";
import { auth } from "../DataBaseSDK/firebaseSDK";
import LoginInput from './LoginInput';
import  MyButton from "./Button";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingUp(props) {

const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const [username, setUsername] = useState('');
  const [Name, setName] = useState();
  const [Bio, setBio] = useState();

    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@email', value)
      } catch (e) {
        console.log(e)
      }
    }



    function addUserToDB(){
      console.log(email,Name,Bio)
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=' + email+"&name="+Name+"&bio="+ Bio
      fetch(apiUrl, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
        .then(
          (result) => {
              console.log("sigup result: " +result)
            }) 
          ,
          (error) => {
            console.log("err get=", error);
          };


    }

  const handleSignUp = () => {
    if(password != passwordMatch){
      alert('Passwords are not matched')
      return
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then (userCredentials => {
        const user = userCredentials.user;
        //  console. log(user.email);
        props.upDateUserName(user.email)
        props.userAuthOK(0) //Switch to the main page
        storeData(email)
        addUserToDB()
      })
      .catch(error => alert(error.message))
  }
  return (
    <>
    <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:'#90E0EF'}}>
    <View style={{flex:0.3,alignContent:'center',justifyContent:'center'}}>
    <Image style={{width:'100%',height:50,marginTop:50}} source={require('../../assets/images/logo-removebg-preview__3_-removebg-preview.png')}/>
    </View>
    <View style={{flex:0.7,display:'flex',alignItems:'center' ,justifyContent:'center'}}>
          <LoginInput lable={'Email'} set={setEmail}/>  
          <LoginInput lable={'Password'} pass={true} set={setPassword}/>
          <LoginInput lable={'Password'} pass={true} set={setPasswordMatch}/>
          <LoginInput lable={'Name'} set={setName}/>
          <LoginInput lable={'Bio'} set={setBio}/>
          <MyButton label={'Sign Up'} size={150} onP={handleSignUp}/>
          <View style={{display:'flex',flexDirection:'row',alignItems:'baseline'}}>
          </View>
    </View>


  </View>

    </>
  )
}


const styles = StyleSheet.create({
    inputbox:{
        flex:1,
         justifyContent:'center',
         alignItems:'center',
        width:'90%'

    },
    input:{
         width:200,
    },
  centeredView: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    marginTop:100,

  },
  modalView: {
    margin: 20,
    marginTop:50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5,
     height:'80%',
     width:'90%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:20,
  },
  buttonOpen: {
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});