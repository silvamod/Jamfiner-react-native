import { View, Text ,StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';import { useState,useCallback } from 'react';
import ToggleSwitch from 'toggle-switch-react-native'


import React from 'react';

const skills = ['Novice','Advanced Beginner','Competent','Proficient','Expert']

export default function Settings() {
  const [miles, setMiles] = useState(0)
  const [skill, setSkill] = useState(0)
  const [stam, setStam] = useState(true)

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,justifyContent:'center'}}>{miles} Miles</Text>
      <Slider
        style={{width: 300, height: 70}}
        minimumValue={0}
        maximumValue={300}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#000000"
        thumbTintColor='#000'
        onValueChange={(val)=>{setMiles(val)}}
        step={1}
        />

      <Text style={{fontSize:20,justifyContent:'center'}}>Skill Level: {skills[skill]}</Text>
      <Slider
        style={{width: 300, height: 70}}
        minimumValue={0}
        maximumValue={4}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#000000"
        thumbTintColor='#000'
        onValueChange={(val)=>{setSkill(val)}}
        step={1}
        />

  <ToggleSwitch
    isOn={stam}
    label="Example label"
    labelStyle={{ color: "black", fontWeight: "900" }}
    size="large"
    onToggle={()=>{setStam(!stam)}}
  />
        
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#d7ff94',
       justifyContent: 'center',
    }
});
