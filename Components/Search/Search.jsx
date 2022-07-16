import { View, Text ,StyleSheet,Image,ImageBackground,Button} from 'react-native';
import SwipeCards from "react-native-swipe-cards-deck";
import React, { useRef } from 'react';
import { useState ,useEffect} from 'react';
import { Audio } from 'expo-av';
import { getData } from '../../utils/storage';


function Card({ data }) {
    return (
        
        <View style={styles.card}>
        <ImageBackground source={{uri:data.img}} style={styles.image}>
        </ImageBackground>
        <View>
        <Text style={styles.name}>{data.score}</Text>
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

export default function Search(props) {
    const [cards, setCards] = useState();
    const [likes, setLikes] = useState();
    const [sound, setSound] = useState();

    const likebtn = useRef()


    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
         require('../../assets/sounds/guitarhero.mp3')
      );
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync(); }
  
    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);


    useEffect(() => {
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?userLike=' + props.username
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
            setLikes(result)
            }) 
          ,
          (error) => {
            console.log("err get=", error);
          };
   }, []);

    useEffect(async() => {
      email = await getData('@email')
      console.log('email!!',email)
      let apiUrl = `https://proj.ruppin.ac.il/bgroup63/test2/tar1/user/getSearchedUsers?targetUser=${email}`
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
          console.log('result',result)
           const userCards = []
           result.map(user => {
             if(user.email != email  & !likes.includes(user.email)){
              //TODO:calc score 0 to 100
              userCards.push(user)
                // userCards.push({ name: user.name,bio:user.bio,image:user.img ,email:user.email,score:user.score})
             }
           }) 

           for (let i = userCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [userCards[i], userCards[j]] = [userCards[j], userCards[i]];
        }
           setCards(userCards)
          // setUser(result)
         },
         (error) => {
           console.log("err get=", error);
         });
   }, [likes]);
  
function getLikes(){
  let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?userLike=' + props.username
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
        console.log(result)
        return result
        }) 
      ,
      (error) => {
        console.log("err get=", error);
      };
}

  
    function postMatch(user, targetUser){
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?match1='+user+'&match2='+targetUser
      fetch(apiUrl, {
        method: 'POST',
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
           console.log(result)
           alert('Its a match !!!')
           playSound()
          },
          (error) => {
            console.log("err get=", error);
          });
    }


    function handleYup(card) {
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?user='+props.username+'&targetUser='+card.email
      console.log(apiUrl)
      fetch(apiUrl, {
        method: 'POST',
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
            if(result == 1){ //MATCH!!$!!
              postMatch(props.username, card.email)
            }
          },
          (error) => {
            console.log("err get=", error);
          });
      return true; // return false if you wish to cancel the action
    }
    
    function handleNope(card) {
     
      return true;
    }
    function handleMaybe(card) {
     
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
            renderNoMoreCards={() => <StatusCard text="No more people..." />}
            actions={{
              nope: { onAction: handleNope ,show:true,containerStyle:{marginBottom:300,marginLeft:230}},
              yup: { onAction: handleYup ,show:true,containerStyle:{marginBottom:300}},
              maybe: { onAction: handleMaybe ,show:false},
              showYup:false,
            }}
            hasMaybeAction={false}
            loop={false}
            
            // If you want a stack of cards instead of one-per-one view, activate stack mode
            // stack={true}
            // stackDepth={3}
          >
          </SwipeCards>

        ) : (
          <StatusCard text="No more people..." />
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
      backgroundColor: "#90E0EF",
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