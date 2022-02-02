import { View, Text ,StyleSheet,Image,ImageBackground,Button} from 'react-native';
import SwipeCards from "react-native-swipe-cards-deck";
import React, { useRef } from 'react';
import { useState ,useEffect} from 'react';

function Card({ data }) {
    return (
        
        <View style={styles.card}>
        <ImageBackground source={{uri:data.image}} style={styles.image}>
        </ImageBackground>
        <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.bio}>{data.bio}</Text>
        </View>
      </View>
    );
  }
  
function StatusCard({ text }) {
    return (
      <View>
        <Text style={styles.cardsText}>{text}</Text>
      </View>
    );
  }

export default function Search() {
    const [cards, setCards] = useState();
    const likebtn = useRef()
    // replace with real remote data fetching
    useEffect(() => {
      setTimeout(() => {
        setCards([
          { name: "Omer",bio:'stamstamstamstamstamstamstamstamstamstamstamstamstamstamstamstamstamstam',image:'https://i.pinimg.com/564x/e8/e6/7a/e8e67ac7701300ff988c3cf560e5f0ee.jpg' },
          { name: "Omer",bio:'stam',image:'https://i.pinimg.com/564x/e8/e6/7a/e8e67ac7701300ff988c3cf560e5f0ee.jpg' },
          { text: "Blueberry", backgroundColor: "blue" },
          { text: "Umm...", backgroundColor: "cyan" },
          { text: "orange", backgroundColor: "orange" },
        ]);
      }, 500);
    }, []);
  
    function handleYup(card) {
      console.log(`Yup for ${card.text}`);
      return true; // return false if you wish to cancel the action
    }
    function handleNope(card) {
      console.log(`Nope for ${card.text}`);
      return true;
    }
    function handleMaybe(card) {
      console.log(`Maybe for ${card.text}`);
      return true;
    }
  
    return (
      <View style={styles.container}>
        {cards ? (
          <SwipeCards
            ref={likebtn}
            cards={cards}
            renderCard={(cardData) => <Card data={cardData} />}
            keyExtractor={(cardData) => String(cardData.text)}
            renderNoMoreCards={() => <StatusCard text="No more cards..." />}
            actions={{
              nope: { onAction: handleNope ,show:true,containerStyle:{marginBottom:300,marginLeft:230}},
              yup: { onAction: handleYup ,show:true,containerStyle:{marginBottom:300}},
              maybe: { onAction: handleMaybe ,show:false},
              showYup:false,
            }}
            hasMaybeAction={false}
            loop={true}
            
            // If you want a stack of cards instead of one-per-one view, activate stack mode
            // stack={true}
            // stackDepth={3}
          >
          </SwipeCards>

        ) : (
          <StatusCard text="Loading..." />
        )}
        <View style={styles.btnContainer}>
        {/* <Button title='Yup' onPress={()=>likebtn.swipeYup()}></Button>
        <Button title='Nope'></Button> */}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eaedee",
      alignItems: "center",
      justifyContent: "center",
      zIndex:1
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        position:'absolute',
        // backgroundColor:'gray',
        width:'100%',
        bottom:'15%',
        
        

    },
    name:{
        // backgroundColor:'blue'
        marginTop:20,
        marginLeft:10,
        fontSize:20,
        fontWeight:'bold',
    },
    bio:{
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
        padding:10,

    },
    image: {
        flex: 1,
        justifyContent: "center",
        width:'100%',
        height:'100%',
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 5, 
        },
      shadowOpacity: 0.80,
      shadowRadius: 4,  
      elevation: 5,
      overflow:'hidden',
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
        
      },
    card: {
      justifyContent: "center",
      alignItems: "flex-start",
      width: 320,
      height: '75%',
      backgroundColor:'#fff',
      borderRadius:10,
      marginBottom:'35%',

    //   borderColor:'black',
    //   borderWidth:1,
    },
    
    cardsText: {
      fontSize: 22,
    },
  });