import { View, Text ,Image,Pressable} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Header(props) {

  return (
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:"center",height:100,backgroundColor:'#ffffff92'}}>
      <Image style={{height:55,width:200,marginTop:50}} source={require("../../assets/images/new_logo.png")}/>
    <Pressable onPress={()=>{
       AsyncStorage.removeItem('@access_token').then(()=>{
        props.userAuthOK(1)
       })
      }}>
      <Icon
          name="log-out"
          size={25}
          style={{marginTop:25,marginRight:20}}
          />
          </Pressable>
    </View>


  )
}