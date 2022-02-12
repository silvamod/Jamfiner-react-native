import { View, Text ,StyleSheet} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'



export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Sup developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])



  return (
    <GiftedChat
    messages={messages}
    showAvatarForEveryMessage={true}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
  />
  );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#1db954',
       justifyContent: 'center',
    },
    header:{
      marginTop:'7%',
      paddingBottom:'2%'
      
    }
  });