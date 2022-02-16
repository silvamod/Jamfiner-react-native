import { View, Text } from 'react-native';
import React from 'react';
import AwesomeButton from "react-native-really-awesome-button";

export default function Button(props) {
  return (
    <View>
      <AwesomeButton
      onPress={() => {
        /** Do Something **/
        props.onP()
      }}
      backgroundColor={'#1a1a1a'}
      width={props.size}
      backgroundDarker={'#191414'}
      textColor={'#b1ff2e'}
      style={{marginTop:10,alignSelf:'stretch'}}
      
    >
      {props.label}
    </AwesomeButton>
    </View>
  );
}
