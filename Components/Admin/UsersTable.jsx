
import { TextArea } from "native-base";
import React, { Component } from "react";
import { Text, View,StyleSheet,SafeAreaView,ScrollView} from 'react-native';
import { Provider ,Appbar,Card,IconButton,Avatar,DataTable, TextInput} from 'react-native-paper';
const UsersTable = () => {
  const itemsPerPage = 2;
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
   React.useEffect(() => {
    setData([{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"},{first_name:"asd", last_name:"qqqqqq"}])
  }, []);
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');
  return (
     
    <Provider>
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="User" subtitle="Subtitle" />                         
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
      <View style={styles.mainbox}>
       <Card>
       
         <DataTable>
          <DataTable.Header style={styles.databeHeader}>
            <DataTable.Title>Photo</DataTable.Title>
            <DataTable.Title>First Name</DataTable.Title>
            <DataTable.Title >Last Name</DataTable.Title>
          </DataTable.Header>
          <SafeAreaView >
            <ScrollView >
           { 
                data.map((l, i) => (
                <DataTable.Row style={styles.databeBox} key={i}>
                  <DataTable.Cell><Avatar.Image size={45} source={{ uri: l.avatar }} /></DataTable.Cell>
                  <DataTable.Cell>{l.first_name}</DataTable.Cell>
                  <DataTable.Cell>{l.last_name}</DataTable.Cell>
                </DataTable.Row>
             ))
           }
             </ScrollView>
    </SafeAreaView>
        </DataTable>
     
     </Card>
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
    flex: 1,
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
export default UsersTable;