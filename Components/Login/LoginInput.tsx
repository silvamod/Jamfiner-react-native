import { View, Text } from 'react-native';
import React from 'react';
import {Madoka}  from 'react-native-textinput-effects';

export default function LoginInput(props) {
  const madokaInput = (
    <Madoka
      label={props.lable}
      // this is used as active and passive border color
      borderColor={'#000'}
      inputPadding={16}
      labelStyle={{ color: '#000' }}
      inputStyle={{ color: '#000', }}
      onChangeText={(text)=>{
      props.set(text)
      console.log(text)
      }}
    />
  );
  
  return (
   <>
      {madokaInput}
    </>
      );
}
