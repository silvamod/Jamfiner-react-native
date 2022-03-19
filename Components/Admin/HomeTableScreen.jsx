import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'


export default function HomeTableScreen({navigation}) {
  return (
    <View>
    <Button icon="account-details" mode="contained" onPress={() => navigation.navigate('UsersTable')}>
        Users Table
    </Button>
    <Button icon="thumb-up" mode="contained" onPress={() => navigation.navigate('LikesTable')}>
        Likes Table
    </Button>
    <Button icon="human-male-male" mode="contained" onPress={() => navigation.navigate('MatchesTable')}>
        Matches Table
    </Button>
  </View>
  )
}




