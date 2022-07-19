import React, { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { Button,Pressable ,StyleSheet,Text,Image} from 'react-native';
import {storeData,getData} from '../../utils/storage'
import {getUserDataFromSpotify} from '../../utils/getUserDataFromSpotify'
import {getUserGenresFromSpotify} from '../../utils/getUserGenresFromSpotify'
import { View } from "native-base";

import { AwesomeButton } from "react-awesome-button";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function SpotifyLogin(props) {


    const [request, response, promptAsync] = useAuthRequest(
        {
          responseType: ResponseType.Token,
          clientId: 'c801fcbbea314d59823055178186320a',
          clientSecret: '0fa7c4023d4642d58429046592cc7fd4',
          scopes: [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "user-read-email",
            "user-read-private",
          ],
          usePKCE: false,
          redirectUri: "exp://127.0.0.1:19000/",
        },
        discovery
      );
    
      
      useEffect(async () => {
        if (response?.type === "success") {
        const { access_token } = response.params;
        await storeData("@access_token", access_token);
        console.log('@access_token',access_token)
        //SYNC !!  Func fetch user info via spotify
          //https://developer.spotify.com/console/get-current-user/
        const userData = await getUserDataFromSpotify(access_token)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        // const token = await getData('@access_token')
        const a = await getUserGenresFromSpotify(access_token)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(userData);
          props.userAuthOK(0)
              
           
              //   method: 'POST',
              //   headers: new Headers({
              //     'Content-Type': 'application/json; charset=UTF-8',
              //     'Accept': 'application/json; charset=UTF-8'
              //   })
              // })
              //   .then(
              //     (result) => {

              //         props.userAuthOK(0)
              //          console.log(result)
              //       }) 
              //     ,
              //     (error) => {
              //       console.log("err get=", error);
              //     };
          
          //Switch to the main page
        //TODO : use => props.upDateUserName(user.email) some how 
        //   dispatch(getCurrentUser()); 
        //   navigation.navigate("Home", { screen: "Home" });
        }
      }, [response]);

  return (
    <Pressable style={styles.button} onPress={promptAsync}>
    <Text style={styles.text}>Login via Spotify</Text>
    <Image style={styles.tinyLogo} source={require('../../assets/images/spotify-black-icon-348155-removebg-preview.png')}></Image>
    <Button
      disabled={!request}
      title=''
      onPress={() => {
        promptAsync();
        }}
    />

    </Pressable>
    
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection:'row',
    height: 60,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1db954',
    
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000',
    marginLeft:35,
  },
  tinyLogo:{
    height: 80,
    width: 80,
  }
});