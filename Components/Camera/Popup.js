import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import CameraFC from "./CameraFC";
import Icon from 'react-native-vector-icons/Feather';
import AwesomeButton from "react-native-really-awesome-button";

const Popup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.popup}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.popup} >
            <View style={styles.modalView}>
              <CameraFC/>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        </View>
        <View style={styles.centeredView}>
          {/* <Text style={styles.textStyle}>Show Modal</Text> */}
          <AwesomeButton 
          width={30} 
          height={35}
          onPress={() => setModalVisible(true)}
          // style={styles.cambtn}
          >
          <Icon
          name="camera"
          size={30}
          />
          </AwesomeButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  popup:{
    justifyContent:"center",
    alignItems:"center"
  },

  centeredView: {
    position:'absolute',
    top:"24.4%",
    left:'90.6%',
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    //marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Popup;