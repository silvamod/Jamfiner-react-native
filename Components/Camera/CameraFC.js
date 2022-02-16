import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraFC(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [picUri, setPicUri] = useState();
  const [email, setemail] = useState()
  const [serverPicUri, setpicserverPicUri] = useState()
  const [imgUpdate, setimgUpdate] = useState()

  const imageUpload = (imgUri) => {
    console.log(props.name)
    let urlAPI = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/uploadpicture';
    console.log('uploading ..')
    let dataI = new FormData();
    dataI.append('picture', {
      uri:  imgUri,
      name: props.name+".jpg",
      type: 'image/jpg'
    });

    const config = {
      method: 'POST',
      body: dataI,
    }

    fetch(urlAPI, config)
      .then((res) => {
        if (res.status == 201) { return res.json(); }
        else { return res.status; }
      })
      .then((responseData) => {
        console.log(responseData);
        setpicserverPicUri("https://proj.ruppin.ac.il/bgroup63/test2/tar1/uploadFiles/"+props.name+".jpg")
      })
      .catch(err => { alert('err upload= ' + err); });
  
}


//upload new img url to server
useEffect(() => {
  if(serverPicUri){
    console.log("api::::")
    let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/updateuser?img='+serverPicUri+"&email="+props.email
    console.log(apiUrl)
   fetch(apiUrl, {
     method: 'PUT',
     headers: new Headers({
      'Content-Type': 'application/json'
    })
   })
   .then(res => {
     return res
  })
     .then(
       (result) => {
         console.log("im here")
         console.log("fetch img= ", result);
          // setimgUpdate(1)
       },
       (error) => {
         console.log("err get=", error);
       });
  }
}, [serverPicUri])

// useEffect(() => {
//   if(imgUpdate){
//   let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email='+props.email
//  fetch(apiUrl, {
//    method: 'GET',
//    headers: new Headers({
//      'Content-Type': 'application/json; charset=UTF-8',
//      'Accept': 'application/json; charset=UTF-8'
//    })
//  })
//    .then(res => {
//      return res.json()
//    })
//    .then(
//      (result) => {
//        console.log("fetch img= ", result);
//       props.setUser(result)
//      },
//      (error) => {
//        console.log("err get=", error);
//      });
//     }
// }, [imgUpdate]);




//upload img after take picture
useEffect(() => {
  if(picUri){
    imageUpload(picUri)
    }
}, [picUri])

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
                // console.log(data.uri)
                setPicUri(data.uri); //after it sets goes to useeffect on picuri
              
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