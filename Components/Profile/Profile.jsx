import { View, Text ,StyleSheet,Image,Button} from 'react-native';
import React from 'react';
import { ProfileHeader } from "@freakycoder/react-native-header-view";
import AwesomeButton from "react-native-really-awesome-button";
import Icon from 'react-native-vector-icons/Feather';

export default function Profile(props) {
  return (
    <>


    <View style={styles.container}>
    <Image style={styles.image} source={{uri:"http://jillchloekenny.com/koken/storage/cache/images/000/027/Indian-Man,medium_large.2x.1428057054.jpg", width:'100%',height:200 }}/>
      <View>
        <AwesomeButton width={50} style={styles.cambtn}>
        <Icon
         name="camera"
         size={40}
        />
        </AwesomeButton>
      </View>
      <Text style={styles.name}>Your Name</Text>
      <Text style={styles.bio}>Bio</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'flex-start',
     backgroundColor: '#1db954',
    //  justifyContent: 'center',
  },
  cambtn:{
    position:'absolute',
    bottom:5,
    left:'85%'
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
