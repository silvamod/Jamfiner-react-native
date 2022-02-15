import { View, Text ,StyleSheet} from 'react-native';
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db } from '../DataBaseSDK/firebaseSDK';



export default function Chat(props) {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Sup developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])
  useLayoutEffect(() => {
    console.log("user: "+ props.route.params.user)
    console.log("target user: "+props.route.params.targetuser)


    const unsubscribe = db.collection(props.route.params.user + "-" + props.route.params.targetuser).orderBy('createdAt'
    ,'desc').onSnapshot(snapshot=>setMessages(
      snapshot.docs.map(doc => (
        {
        _id:doc.data()._id,
        createdAt:doc.data().createdAt.toDate(),
        text:doc.data().text,
        user:doc.data().user,
        from:doc.data().from,
        to:doc.data().to
      }
        )
      )
    ))
    return unsubscribe;
  },[])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => 
      GiftedChat.append(previousMessages, messages))

    const {
      _id,
      createdAt,
      text,
      user,
      from,
      to
    }=messages[0]
    db.collection(props.route.params.user + "-" + props.route.params.targetuser).add({
      _id,
      createdAt,
      text,
      user,
      from:props.route.params.user,
      to:props.route.params.targetuser
    })   
       db.collection( props.route.params.targetuser + "-" + props.route.params.user ).add({
      _id,
      createdAt,
      text,
      user,
      from:props.route.params.user,
      to:props.route.params.targetuser
    })
  }, [])



  return (
    <View style={styles.container}>
    <GiftedChat

    messages={messages}
    showAvatarForEveryMessage={true}
    onSend={messages => onSend(messages)}
    user={{
      _id: auth?.currentUser?.email,
    }}
  />
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
       flex: 0.85,

    },
    header:{
      marginTop:'7%',
      paddingBottom:'2%'
      
    }
  });