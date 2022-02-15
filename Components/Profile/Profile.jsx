import { View, Text ,StyleSheet,Image} from 'react-native';
import React from 'react';
import Popup from '../Camera/Popup';
import * as Location from 'expo-location';
import { useEffect,useState } from 'react';

export default function Profile(props) {

  const [locationAl, setLocationAl] = useState(null);
  const [locationLo, setLocationLo] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState()


  useEffect(() => {
    if(locationLo){
     
        fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${locationAl}%2C${locationLo}&language=en`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "d85f0fed1fmsh53f3a83ff8795bep19a5ddjsne5d81d4265ee"
        }

    }).then(response => {
      console.log("haaaa");
        console.log(response.results[0]);
        console.log("haaaa2");
    })
    .catch(err => {
        console.error(err);
    });
    }
  }, [locationLo])
  

  function locationToCity(location){
    if(location){
      console.log(location.coords.langtitude)
        fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${location.coords.langtitude}%2C${location.coords.latitude}&language=en`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "d85f0fed1fmsh53f3a83ff8795bep19a5ddjsne5d81d4265ee"
        }

    }).then(response => {
      console.log("haaaa");
        console.log(response.results[0]);
        console.log("haaaa2");
    })
    .catch(err => {
        console.error(err);
    });
    }
  }

  useEffect(() => { //get loc
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocationAl(location.coords.altitude)
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
    <Popup/>
      <View>
      </View>
      <Text style={styles.name}>{location}</Text>
      <Text style={styles.name}>{user.email.split('@')[0]}</Text>
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
