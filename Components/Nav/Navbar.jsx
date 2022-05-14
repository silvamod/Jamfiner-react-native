// Javascript
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Profile from "../Profile/Profile";
import Icon from 'react-native-vector-icons/Feather';
import Settings from "../Settings/Settings";
import { StyleSheet, View } from 'react-native';
import Search from "../Search/Search";
import Chat from "../Chat/Chat";
import { ProfileHeader } from "@freakycoder/react-native-header-view";
import { useState , useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ChatNav from "../Chat/ChatNav";
import Header from "../Header/Header";
import Admin from "../Admin/Admin";


const Tabs = AnimatedTabBarNavigator();

export default function Navbar(props) {
const [isAdmin, setisAdmin] = useState(false)
return(

<>
<View style={styles.header}>
<Header userAuthOK={props.userAuthOK}/>
</View>

  <Tabs.Navigator
  independent={true}
    // default configuration from React Navigation
    screenOptions={{tabBarHideOnKeyboard: true}}
    tabBarOptions={{
      activeTintColor: "#000",
      activeBackgroundColor: '#fff',
      inactiveTintColor: "#fff",

      tabStyle : styles.tabs
    }}
    appearance={{
       
    }}
  >
{isAdmin ? 
<Tabs.Screen
      name="Admin"
      children={()=><Admin username={props.username} />}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="users"
                size={size ? size : 24}
                color={focused ? color : "#ffffff"}
                focused={focused}
            />
        )
      }}
    /> : <></>}

<Tabs.Screen
      name="Profile"
      children={()=><Profile username={props.username} setisAdmin={setisAdmin}/>}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="user"
                size={size ? size : 24}
                color={focused ? color : "#ffffff"}
                focused={focused}
            />
        )
      }}
    />

<Tabs.Screen
      name="Search"
      children={()=><Search username={props.username}/>}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="search"
                size={size ? size : 24}
                color={focused ? color : "#ffffff"}
                focused={focused}
            />
        )
      }}
    />



<Tabs.Screen
      name="Chat"
      children={()=><ChatNav username={props.username}/>}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="message-circle"
                size={size ? size : 24}
                color={focused ? color : "#fff"}
                focused={focused}
            />
        )
      }}
    />

    
    <Tabs.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="settings"
                size={size ? size : 24}
                color={focused ? color : "#fff"}
                focused={focused}
            />
        )
      }}
    />
  </Tabs.Navigator>
  </>
)
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1db954',
    justifyContent: 'center',
  },
  tabs: {
     backgroundColor: '#000'
  },
  header:{
    borderBottomColor:'#000',
    borderBottomWidth:1
  }
});