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
          <Pressable onPress={()=>{ props.navigation.navigate('Chat',{targetuser:item.id ,user:props.email})}}>
            <HStack space={3} justifyContent="space-between">
              <Avatar size="48px" source={{
          uri: item.avatarUrl
        }} />
              <VStack>
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

  // const data = [{
  //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", // email here
  //   fullName: "Aafreen Khan",
  //   timeStamp: "12:47 PM",
  //   recentText: "Good Day!",
  //   avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    
  
  // }, {
  //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //   fullName: "Sujitha Mathur",
  //   timeStamp: "11:11 PM",
  //   recentText: "Cheer up, there!",
  //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  // }, {
  //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //   fullName: "Anci Barroco",
  //   timeStamp: "6:22 PM",
  //   recentText: "Good Day!",
  //   avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  // }, {
  //   id: "68694a0f-3da1-431f-bd56-142371e29d72",
  //   fullName: "Aniket Kumar",
  //   timeStamp: "8:56 PM",
  //   recentText: "All the best",
  //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  // }, {
  //   id: "28694a0f-3da1-471f-bd96-142456e29d72",
  //   fullName: "Kiara",
  //   timeStamp: "12:47 PM",
  //   recentText: "I will call today.",
  //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  // }
// ];


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
  
  


  //getData()
 // console.log(props.navigation)
 //const value = useContext(UsernameContext);
//  useEffect(() => {
//   getData()
//  }, [])

        
        return (
          
          <NativeBaseProvider>
                <Example  navigation={props.navigation}  data={data} email={email} />
          </NativeBaseProvider>
        
        );
    };