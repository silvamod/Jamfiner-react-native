
import { TextArea } from "native-base";
import React, { Component } from "react";
import { Text, View,StyleSheet,SafeAreaView,ScrollView,useEffect} from 'react-native';
import { Provider ,Appbar,Card,IconButton,Avatar,DataTable, TextInput} from 'react-native-paper';



export default function UsersTable ({navigation}) {

  const itemsPerPage = 2;
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const _goBack = () => {navigation.goBack()};
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');



  React.useEffect(() => {
    let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user'
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
         const userCards = []
         result.map(user => {
            userCards.push({ name: user.name,bio:user.bio,image:user.img ,email:user.email})
           
         }) 
         console.log(userCards)
         setData(userCards)
        // setUser(result)
       },
       (error) => {
         console.log("err get=", error);
       });
 }, []);

  return (
   
    <Provider>
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="User" subtitle="Subtitle" />                         
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>

      <View style={styles.mainbox}>
        <SafeAreaView>
       <Card>       
         <DataTable>
           
          <DataTable.Header style={styles.databeHeader}>
            <DataTable.Title>Photo</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title >Email</DataTable.Title>
          </DataTable.Header>
         <ScrollView>

           { 
                data.map((l, i) => (
                <DataTable.Row style={styles.databeBox} key={i}>
                  <DataTable.Cell><Avatar.Image size={45} source={{ uri: l.image }} /></DataTable.Cell>
                  <DataTable.Cell>{l.name}</DataTable.Cell>
                  <DataTable.Cell>{l.email}</DataTable.Cell>
                </DataTable.Row>
             ))
           }
              </ScrollView>
            </DataTable>
          </Card>
        </SafeAreaView>
      </View> 
    </Provider>
  );
};
const styles = StyleSheet.create({
  title:{
    margin: 10,
    fontSize: 15,
    fontSize: 35
  },
  mainbox:{
    textAlign:'center',
    margin: 15,
    flex: 0.8,
    justifyContent: 'space-between',
  },
  databeBox:{
    margin: 10,
    textAlign: 'center',
  },
  databeHeader:{
    margin: 10,
    textAlign: 'left', 
  }
});
