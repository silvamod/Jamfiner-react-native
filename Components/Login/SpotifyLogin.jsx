import React, { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { Button } from 'react-native';
import {storeData} from '../../utils/storage'
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
    

      useEffect(() => {
        if (response?.type === "success") {
          const { access_token } = response.params;
          storeData("@access_token", access_token);
          console.log('@access_token',access_token)
          props.userAuthOK(0) 
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