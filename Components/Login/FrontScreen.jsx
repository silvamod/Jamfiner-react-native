import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'
import Button from './Button'
export default function FrontScreen({navigation}) {
  return (
    <View style={{flex:1,backgroundColor:'#90E0EF'}}>
      <View style={{flex:0.7,justifyContent:'center',alignItems:'center'}}>
      <Image style={{height:44,width:400}} source={require("../../assets/images/logo-removebg-preview__3_-removebg-preview.png")}/>
      <Image style={{height:350,width:450}} source={require("../../assets/playing.png")}/>
      </View>


      <View style={{flex:0.3,alignItems:'center',justifyContent:'center',marginBottom:50}}>
      <Button  label={'Login'} size={250} onP={()=>{navigation.navigate('Login')}}></Button>
      <Button  label={'Sign Up'} size={250} onP={()=>{navigation.navigate('SingUp')}}></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn:{
    padding:111

  }


});