import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'
import Button1 from './Button'
import SpotifyLogin from './SpotifyLogin'
import { useNavigation } from '@react-navigation/native';



export default function FrontScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{flex:0.7,justifyContent:'center',alignItems:'center'}}>
      <Image style={{height:110,width:400}} source={require("../../assets/images/new_logo.png")}/>
      {/* <Image style={{height:350,width:450}} source={require("../../assets/playing.png")}/> */}
      </View>

      <View style={{flex:0.3,alignItems:'center',justifyContent:'center',marginBottom:50}}>
      {/* <Button1  label={'Login'} size={250} onP={()=>{navigation.navigate('Login')}}></Button1>
      <Button1  label={'Sign Up'} size={250} onP={()=>{navigation.navigate('SingUp')}}></Button1> */}
      <SpotifyLogin userAuthOK={props.userAuthOK}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn:{
    padding:111

  }


});