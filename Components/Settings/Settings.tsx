import Slider from '@react-native-community/slider';
import ToggleSwitch from 'toggle-switch-react-native'
import React, { useState } from 'react'
import { Text, View ,StyleSheet,ScrollView} from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import AwesomeButton from "react-native-really-awesome-button";



// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: 'Vocalist',
    id: 'VOC',
  },
  {
    item: 'Guitarist',
    id: 'GU',
  },
  {
    item: 'Violinist',
    id: 'VIO',
  },
  {
    item: 'Pianist',
    id: 'PIA',
  },
  {
    item: 'Flutist',
    id: 'FLU',
  }
]

const skills = ['Novice','Advanced Beginner','Competent','Proficient','Expert']




export default function Settings() {
  const [miles, setMiles] = useState(0)
  const [skill, setSkill] = useState(0)
  const [male, setMale] = useState(true)
  const [female, setFemale] = useState(true)

  const [selectedTeams, setSelectedTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState({})


  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

  function onChange() {
    return (val) => setSelectedTeam(val)
  }

  return (



   
    <View style={styles.container}>
    <View style={styles.multiselectdemocontainer}>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Instruments</Text>
      <SelectBox
        label="Select Instruments"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
        arrowIconColor={'#000'}
        searchIconColor={'#000'}
        toggleIconColor={'#000'}
        optionsLabelStyle={styles.selectitem}
        multiOptionsLabelStyle={styles.selectitem2}
        multiOptionContainerStyle={styles.selectcontainer}
      />
</View>
      <Text style={{fontSize:20,justifyContent:'center',paddingTop:10}}>{miles} Miles</Text>
      <Slider
        style={{width: 300, height: 70}}
        minimumValue={0}
        maximumValue={300}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#fff"
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
        maximumTrackTintColor="#fff"
        thumbTintColor='#000'
        onValueChange={(val)=>{setSkill(val)}}
        step={1}
        />
<View style={{marginBottom:20}}>
  <ToggleSwitch
    isOn={male}
    label="Male   "
    labelStyle={{ color: "black", fontWeight: "300"}}
    onToggle={()=>{setMale(!male)}}
  />
</View>


<ToggleSwitch
    isOn={female}
    label="Female"
    labelStyle={{ color: "black", fontWeight: "300" }}
    onToggle={()=>{setFemale(!female)}}
/>


<View>
      <AwesomeButton
      onPress={() => {
        /** Do Something **/
      }}
      backgroundColor={'#1a1a1a'}
      width={250}
      backgroundDarker={'#191414'}
      textColor={'#b1ff2e'}
      style={{marginTop:10}}
      textSize={22}
    >
      Save
    </AwesomeButton>
    </View>

    </View>



  );
}


const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#d7ff94',
       justifyContent: 'flex-start',
       padding:5,
    },
    selectitem:{
      color:'#000'
    }, 
    selectitem2:{
      fontSize:15,
      color:'#000',
    },
    selectcontainer:{
      backgroundColor:'#D2691E'
    },
    multiselectdemocontainer:{
      width:'90%',

    }


});
