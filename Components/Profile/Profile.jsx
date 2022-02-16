import { View, Text ,StyleSheet,Image} from 'react-native';
import React from 'react';
import Popup from '../Camera/Popup';
import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import Geocode from "react-geocode";

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
        const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=Lzc7d0Uxe9SgQsktA6-LmkFG5UK11TsgyVsbmoI3OrQ&mode=retrieveAddresses&prox=${locationAl},${locationLo}`
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

//   useEffect(() => {

//     if(locationLo){
//     // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("887f0dd3c403786a1e106aee8d8be0dd");

// // set response language. Defaults to english.
// Geocode.setLanguage("en");

// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("es");

// // set location_type filter . Its optional.
// // google geocoder returns more that one address for given lat/lng.
// // In some case we need one address as response for which google itself provides a location_type filter.
// // So we can easily parse the result for fetching address components
// // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// Geocode.setLocationType("ROOFTOP");

// // Enable or disable logs. Its optional.
// Geocode.enableDebug();

// // Get address from latitude & longitude.
// Geocode.fromLatLng(locationAl, locationLo).then(
//   (response) => {
//     const address = response.results[0].formatted_address;
//     console.log(address);
//   },
//   (error) => {
//     console.error(error);
//   }
// );
//     }
//   }, [locationLo])
  
  

  // function locationToCity(location){
  //   if(location){
  //     console.log(location.coords.langtitude)
  //       fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${location.coords.langtitude}%2C${location.coords.latitude}&language=en`, {
  //       "method": "GET",
  //       "headers": {
  //           "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
  //           "x-rapidapi-key": "d85f0fed1fmsh53f3a83ff8795bep19a5ddjsne5d81d4265ee"
  //       }

  //   }).then(response => {
  //     console.log("haaaa");
  //       console.log(response.results[0]);
  //       console.log("haaaa2");
  //   })
  //   .catch(err => {
  //       console.error(err);
  //   });
  //   }
  // }

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

  useEffect(() => {
    let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email='+props.username
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
      <Text style={styles.bio}>Bio:{user.bio}]</Text>
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
