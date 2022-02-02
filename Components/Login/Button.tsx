import { View, Text } from 'react-native';
import React from 'react';
import AwesomeButton from "react-native-really-awesome-button";

export default function Button(props) {
  return (
    <View>
      <AwesomeButton
      onPress={() => {
        /** Do Something **/
        props.handleSignUp()
      }}
      backgroundColor={'#fff'}
      width={250}
      backgroundDarker={'#191414'}
      textColor={'#000'}
      style={{marginTop:10}}
    >
      {props.label}
    </AwesomeButton>
    </View>
  );
}
