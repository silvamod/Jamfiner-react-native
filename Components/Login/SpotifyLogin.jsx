import React, { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { Button } from 'react-native';
import {storeData,getData} from '../../utils/storage'
import {getUserDataFromSpotify} from '../../utils/getUserDataFromSpotify'
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
          storeData("@access_token", access_token);
          console.log('@access_token',access_token)
          //SYNC !!  Func fetch user info via spotify
          //https://developer.spotify.com/console/get-current-user/
         console.log('1')
        await getUserDataFromSpotify(access_token)
         console.log('2')
          props.userAuthOK(0)
         console.log('3')
              
           
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
    <Button
      disabled={!request}
      title="Login via Spotify"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}