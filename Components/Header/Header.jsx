import { View, Text ,Image,Pressable} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';

export default function Header(props) {
  return (
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:"center",height:100,backgroundColor:'#0077b6'}}>
      <Image style={{height:44,width:300,marginTop:30,marginLeft:-60}} source={require("../../assets/images/logo-removebg-preview__3_-removebg-preview.png")}/>
    <Pressable onPress={()=>{props.userAuthOK(1)}}>
      <Icon
          name="log-out"
          size={25}
          style={{marginTop:25,marginRight:20}}
          />
          </Pressable>
    </View>


  )
}