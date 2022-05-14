import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Nav/Navbar";
import { NavigationContainer } from "@react-navigation/native";
import LoginNav from "./Components/Login/LoginNav";
import { getData } from "./utils/storage";

const fetchUser = async () => {
  const user = await getData("@access_token");
  console.log("access_token", user);
  if (!user) {
    setisLogin(1);
  } else {
    setisLogin(0);
  }
};

export default function App() {
  const [isLogin, setisLogin] = useState(1);
  const [username, setUsername] = useState("");

  fetchUser();

  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        {
          isLogin ? (
            <View style={styles.container}>
              <LoginNav
                style={styles.loginview}
                userAuthOK={setisLogin}
                upDateUserName={setUsername}
              />
              {/* <Login style={styles.loginview} userAuthOK={setisLogin} upDateUserName={setUsername}/> */}
            </View>
          ) : (
            <Navbar username={username} userAuthOK={setisLogin} />
          )
          //TODO: Pass to the navbar the user info to load
          //          after from SQL all the data about him
        }
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  alignItems: 'center',
    backgroundColor: "#c4ff61",
    //  marginTop:20,
  },
  logBTN: {
    paddingBottom: "50px",
  },
  loginview: {
    flex: 0.5,
  },
});
