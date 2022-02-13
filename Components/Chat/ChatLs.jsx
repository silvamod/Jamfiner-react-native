import { ChatList } from 'react-chat-elements/native'
import { View, Text } from 'react-native'
import React from 'react'

export default function ChatLs() {
  return (
<View>
    <ChatList
    className='chat-list'
    dataSource={[
        {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        },
   
    ]} />
    </View>


  )
}



