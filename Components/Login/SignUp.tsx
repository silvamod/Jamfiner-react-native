
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { auth } from "../DataBaseSDK/firebaseSDK";
import LoginInput from './LoginInput';

export default function SingUp(props) {

const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then (userCredentials => {
        const user = userCredentials.user;
        //  console. log(user.email);
        props.upDateUserName(user.email)
        props.userAuthOK(0) //Switch to the main page
        setModalVisible(!modalVisible)
      })
      .catch(error => alert(error.message))
  }
  return (
    <View style={styles.centeredView}>

        <View style={styles.centeredView}>

            {/* <View style={styles.inputbox}> */}
            <Text style={{fontSize:30,marginLeft:22,fontWeight:'bold'}}>Sing Up</Text>
            <LoginInput style={styles.input} lable={'Email'} set={setEmail}/>
            <LoginInput style={styles.input} lable={'Password'} pass={true} set={setPassword}/>    
            <LoginInput style={styles.input} lable={'Username'} set={setUsername}/>    

            {/* </View> */}
                
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleSignUp()}
            >
                {/* setModalVisible(!modalVisible) */}
              <Text style={styles.textStyle}>Register</Text>
            </Pressable>
        </View>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
      </Pressable>
    </View>
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