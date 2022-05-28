import Slider from "@react-native-community/slider";
import ToggleSwitch from "toggle-switch-react-native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import AwesomeButton from "react-native-really-awesome-button";
import{updateUserSettigns,SettingsInterface} from '../../utils/updateUserSettings'
// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: "Vocalist",
    id: "VOC",
  },
  {
    item: "Guitarist",
    id: "GU",
  },
  {
    item: "Violinist",
    id: "VIO",
  },
  {
    item: "Pianist",
    id: "PIA",
  },
  {
    item: "Flutist",
    id: "FLU",
  },
];

const skills = [
  "Novice",
  "Advanced Beginner",
  "Competent",
  "Proficient",
  "Expert",
];

export default function Settings() {
  // const [selectedTeams, setSelectedTeams] = useState([]);
  // const [selectedTeam, setSelectedTeam] = useState({});
  const [settings, setSettings] = useState({
    miles: 0,
    skill: "",
    male: true,
    female: true,
    selectedItems: [],
  });

  function onMultiChange() {
    // setSettings((prevState) => ({
    //   ...prevState,
    //   selectedItems: selectedTeams,
    // }));
    return (item) => setSettings((prevState) =>({
      ...prevState,
      selectedItems:(xorBy(settings.selectedItems, [item], "id"))
    }));
  }

  // function onChange() {
  //   return (val) => setSelectedTeam(val);
  // }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.multiselectdemocontainer}>
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>Instruments</Text>
          <SelectBox
            label="Select Instruments"
            options={K_OPTIONS}
            selectedValues={settings.selectedItems}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
            arrowIconColor={"#000"}
            searchIconColor={"#000"}
            toggleIconColor={"#000"}
            optionsLabelStyle={styles.selectitem}
            multiOptionsLabelStyle={styles.selectitem2}
            multiOptionContainerStyle={styles.selectcontainer}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          {settings.miles} Miles
        </Text>
        <Slider
          style={{ width: 300, height: 70 }}
          minimumValue={0}
          maximumValue={300}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#fff"
          thumbTintColor="#000"
          onValueChange={(val) => {
            setSettings((prevState) => ({
              ...prevState,
              miles: val,
            }));
          }}
          step={1}
        />

        <Text style={{ fontSize: 20, justifyContent: "center" }}>
          Skill Level: {settings.skill}
        </Text>
        <Slider
          style={{ width: 300, height: 70 }}
          minimumValue={0}
          maximumValue={4}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#fff"
          thumbTintColor="#000"
          onValueChange={(val) => {
            setSettings((prevState) => ({
              ...prevState,
              skill: skills[val].toString(),
            }));
          }}
          step={1}
        />
        <View style={{ marginBottom: 20 }}>
          <ToggleSwitch
            isOn={settings.male}
            label="Male   "
            labelStyle={{ color: "black", fontWeight: "300" }}
            onToggle={() => {
              setSettings((prevState) => ({
                ...prevState,
                male: !settings.male,
              }));
            }}
          />
        </View>

        <ToggleSwitch
          isOn={settings.female}
          label="Female"
          labelStyle={{ color: "black", fontWeight: "300" }}
          onToggle={() => {
            setSettings((prevState) => ({
              ...prevState,
              female: !settings.female,
            }));
          }}
        />

        <View>
          <AwesomeButton
            onPress={() => {
              /** Do Something **/
              //TODO :: FETCH TO SERVER WITH SETTINGS + LOADING
              const s:SettingsInterface = {
                email : 'email',
                miles: settings.miles,
                skill : settings.skill,
                male : settings.male,
                female : settings.female,
                selectedItems : settings.selectedItems
              }
              updateUserSettigns(s)
            }}
            backgroundColor={"#1a1a1a"}
            width={200}
            backgroundDarker={"#191414"}
            textColor={"#fff"}
            style={{ marginTop: 10 }}
            textSize={22}
          >
            Save
          </AwesomeButton>

          <AwesomeButton
            onPress={() => {
              console.log(settings);
              console.log("selectedTeams", selectedTeams);
            }}
            backgroundColor={"#1a1a1a"}
            width={200}
            backgroundDarker={"#191414"}
            textColor={"#fff"}
            style={{ marginTop: 10 }}
            textSize={22}
          >
            print
          </AwesomeButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#90E0EF",
    justifyContent: "flex-start",
    padding: 5,
  },
  selectitem: {
    color: "#000",
  },
  selectitem2: {
    fontSize: 15,
    color: "#fff",
  },
  selectcontainer: {
    backgroundColor: "#0077b6",
  },
  multiselectdemocontainer: {
    width: "90%",
  },
});
