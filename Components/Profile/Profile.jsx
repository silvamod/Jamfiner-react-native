import { View, Text ,StyleSheet,Image} from 'react-native';
import React from 'react';
import Popup from '../Camera/Popup';
import * as Location from 'expo-location';
import { useEffect,useState } from 'react';

export default function Profile(props) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => { //get loc
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.accuracy);
     console.log(location)
    })();
  }, []);


  return (
    <>

    <View style={styles.container}>
    <Image style={styles.image} source={{uri:"http://jillchloekenny.com/koken/storage/cache/images/000/027/Indian-Man,medium_large.2x.1428057054.jpg", width:'100%',height:200 }}/>
    <Popup/>
      <View>
      </View>
      <Text style={styles.name}>{location}</Text>
      <Text style={styles.name}>Your Name omer</Text>
      <Text style={styles.bio}>Bio</Text>
    </View>


    </>
  );
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
