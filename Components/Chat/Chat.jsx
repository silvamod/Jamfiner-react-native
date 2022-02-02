import { View, Text ,StyleSheet} from 'react-native';
import React from 'react';

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text>Chat !!!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#1db954',
       justifyContent: 'center',
    },
    header:{
      marginTop:'7%',
      paddingBottom:'2%'
      
    }
  });