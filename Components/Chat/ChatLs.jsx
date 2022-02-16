import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { Pressable,View } from "react-native";
import React, {useEffect, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Example = (props) => {
if(props.data){
  console.log("building message list ..")

    return <Box>
      <FlatList data={props.data} renderItem={({
      item
    }) =>  
    
    <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
          <Pressable onPress={()=>{ props.navigation.navigate('Chat',{targetuser:item.id.toLowerCase() ,user:props.email})}}>
            <HStack space={3} justifyContent="space-between">
              <Avatar  size="48px" source={{
          uri: item.avatarUrl
        }} />
              <VStack >
                <Text style={{fontSize:20, marginTop:20}} _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.fullName}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.timeStamp}
              </Text>
            </HStack>
            </Pressable> </Box>} keyExtractor={item => item.id} />
         
    </Box>  ;

}

return <View><Text>Loading ..</Text></View>

};

export default function ChatLs(props) {

  const [email, setemail] = useState()
  const [data, setdata] = useState()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@email')
      if(value !== null) {
        // value previously stored
        setemail(value.toLowerCase())
      }
    } catch(e) {
      // error reading value
      
    }
  }

  if(!email){
  getData()
  }

  useEffect(() => {
    const tempdata=[]
    if(email){
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?targetUser=' + email
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
            result.map(user => {
              tempdata.push({
                id: user.email,
                fullName: user.name,
                 timeStamp: "",
                 recentText: "",
                 avatarUrl: user.img
              })
            }) 
            setdata(tempdata)
            }) 
          ,
          (error) => {
            console.log("err get=", error);
          };
        }

  }, [email])

        
        return (
          
          <NativeBaseProvider>
                <Example  navigation={props.navigation}  data={data} email={email} />
          </NativeBaseProvider>
        
        );
    };