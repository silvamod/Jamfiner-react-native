import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
var querystring = require('querystring');

var client_id = 'c801fcbbea314d59823055178186320a'; // Your client id
var client_secret = '0fa7c4023d4642d58429046592cc7fd4'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
var scope = 'user-read-private user-read-email user-top-read';


var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


export default function SpotifyLoginCom() {
    var state = generateRandomString(16);

  return (
      <>
    <WebView source={{ uri: 'https://accounts.spotify.com/authorize?'+
         querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            // redirect_uri: redirect_uri,
            state: state
          })
        }} />
    </>
  )
}