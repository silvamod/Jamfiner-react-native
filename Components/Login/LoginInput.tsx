import { View, Text } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Hideo } from "react-native-textinput-effects";
import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export default function LoginInput(props) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={props.lable}
        onChangeText={(text) => {
          props.set(text);
          console.log(text);
        }}
        secureTextEntry={props.pass}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    direction: "ltr",
    height: 55,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch",
    marginLeft: 60,
    marginRight: 60,
  },
});
