import { View, Text ,StyleSheet,Image} from 'react-native';
import React from 'react';
import Popup from '../Camera/Popup';
import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import Geocode from "react-geocode";
import { getData } from '../../utils/storage';
export default function Profile(props) {

  const [locationAl, setLocationAl] = useState(null);
  const [locationLo, setLocationLo] = useState(null);
  const [city, setcity] = useState()
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState()



  useEffect(() => {
    console.log(locationLo)
    console.log(locationAl)
    if(locationLo){

      new Promise((resolve) => {
        const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=aXHjkarN6T4a_3Go_EbLf3erpq2jWETODmdxi3powpM&mode=retrieveAddresses&prox=${locationAl},${locationLo}`
        fetch(url)
          .then(res => res.json())
          .then((resJson) => {
            // the response had a deeply nested structure :/
            if (resJson
              && resJson.Response
              && resJson.Response.View
              && resJson.Response.View[0]
              && resJson.Response.View[0].Result
              && resJson.Response.View[0].Result[0]) {
              resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
              console.log(resJson.Response.View[0].Result[0].Location.Address.City)
                setcity(resJson.Response.View[0].Result[0].Location.Address.City)
            } else {
              resolve()
            }
          })
          .catch((e) => {
            console.log('Error in getAddressFromCoordinates', e)
            resolve()
          })
      })


    }
  }, [locationLo])


  useEffect(() => { //get loc
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocationAl(location.coords.latitude)
      setLocationLo(location.coords.longitude)
      //locationToCity(location)
    })();
  }, []);

  useEffect( async() => {
    const email = await getData('@email')
    console.log('getData()',email)
    let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email='+ email
    console.log('apiUrl()',apiUrl)

   fetch(apiUrl, {
     method: 'GET',
     headers: new Headers({
       'Content-Type': 'application/json; charset=UTF-8',
       'Accept': 'application/json; charset=UTF-8'
     })
   })
     .then(res => {
       return res.json()
     })
     .then(
       (result) => {
         console.log("fetch img= ", result);
        setUser(result)
        if(result.isAdmin == 1){
          props.setisAdmin(true)
        }
       },
       (error) => {
         console.log("err get=", error);
       });
 }, []);
 if(user){
  return (
    <>

    <View style={styles.container}>
    <Image style={styles.image} source={{uri:user.img, width:'100%',height:200 }}/>
    <Popup name={user.name} email={user.email} setUser={setUser}/>
      <View>
      </View>
      <Text style={styles.name}>{city}</Text>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>Bio:{user.bio}</Text>
    </View>


    </>
  )}
  return (<View><Text>Loading ..</Text></View>)
  
  ;
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'flex-start',
     backgroundColor: '#fff',
    //  justifyContent: 'center',
  },
  cambtn:{
    // position:'absolute',
    // bottom:5,
    // left:'85%'
  },
  header:{
    marginTop:'10%',
    paddingBottom:'2%'
  },
  image:{

  },
  name:{
    marginTop:10,
    marginLeft:10,
    fontWeight:'bold',
    fontSize:40,
  },
  bio:{
    marginTop:10,
    marginLeft:10,
    fontSize:20,
    opacity:0.4  
}
});