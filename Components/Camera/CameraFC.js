import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraFC() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [picUri, setPicUri] = useState();


  const imageUpload = (imgUri) => {
    let urlAPI = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/uploadpicture';
if(imgUri){
    let dataI = new FormData();
    dataI.append('picture', {
      uri: imgUri,
      name: "stam",
      type: 'image/jpg'
    });

    const config = {
      method: 'POST',
      body: dataI,
    }

    fetch(urlAPI, config)
      .then((res) => {
        if (res.status == 201) { return res.json(); }
        else { return "err"; }
      })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch(err => { alert('err upload= ' + err); });
  }
}



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}
        ref={ref => setCamera(ref)}
        type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (camera) {
                const data = await camera.takePictureAsync(null);
                console.log(data.uri)
                setPicUri(data.uri);
                imageUpload(picUri)
              }

            }}>
            <Text style={styles.text}> Snap </Text>
          </TouchableOpacity>

        </View>
      </Camera>

      <View style={{
        flex: 0.4, justifyContent: 'center', alignItems: 'center', margin: 20
      }}>
        <Text>Img</Text>
        <Image
          source={{ uri: picUri }}
          style={{ width: 250, height: 150, borderWidth: 1, borderColor: 'red', margin: 10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 0.6,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});