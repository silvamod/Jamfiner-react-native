// Javascript
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Profile from "../Profile/Profile";
import Icon from 'react-native-vector-icons/Feather';
import Settings from "../Settings/Settings";
import { StyleSheet, View } from 'react-native';
import Search from "../Search/Search";
import Chat from "../Chat/Chat";
import { ProfileHeader } from "@freakycoder/react-native-header-view";

const Tabs = AnimatedTabBarNavigator();
//TODO:Make the profile open first

export default (props) => (


<>
<View style={styles.header}>
<ProfileHeader 
titleText={props.username}
disableFirstIcon={true}
disableSecondIcon={true}
//TODO:fetch/add img and name
/>
</View>
  <Tabs.Navigator
    // default configuration from React Navigation
    tabBarOptions={{
      activeTintColor: "#000",
      activeBackgroundColor: '#fff',
      inactiveTintColor: "#fff",
      floating:true,
      tabStyle : styles.tabs
    }}
    appearance={{
        floating:true,
    }}
  >


    <Tabs.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="settings"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}
    />

<Tabs.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="search"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}
    />

<Tabs.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="message-circle"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}
    />

<Tabs.Screen
      name="Profile"
      children={()=><Profile username={props.username}/>}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="user"
                size={size ? size : 24}
                color={focused ? color : "#1db954"}
                focused={focused}
                color={color}
            />
        )
      }}
    />

  </Tabs.Navigator>
  </>
)


const styles = StyleSheet.create({
  tabs: {
     backgroundColor: '#000'
  },
  header:{
    marginTop:'10%',
    paddingBottom:'2%'
  },
});
