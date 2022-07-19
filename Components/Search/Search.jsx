import { View, Text ,StyleSheet,Image,ImageBackground,Button} from 'react-native';
import SwipeCards from "react-native-swipe-cards-deck";
import React, { useRef } from 'react';
import { useState ,useEffect} from 'react';
import { Audio } from 'expo-av';
import { getData } from '../../utils/storage';


function Card({ data }) {
    return (
        
        <View style={styles.card}>
        <ImageBackground source={{uri:data.image}} style={styles.image}>
        </ImageBackground>
        <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.bio}>{data.bio}</Text>
        <Text style={styles.score}>{data.score.toFixed(1)} %</Text>
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


    useEffect( async() => {
      email = await getData('@email')
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?userLike=' +email
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
            console.log("userLike err get=", error);
          };
   }, []);

    useEffect(async() => {
      email = await getData('@email')
      console.log('email!!',email)
      if(likes){
      let apiUrl = `https://proj.ruppin.ac.il/bgroup63/test2/tar1/user/getSearchedUsers?targetUser=${email}`
     fetch(apiUrl, {
       method: 'GET',
       headers: new Headers({
         'Content-Type': 'application/json; charset=UTF-8',
         'Accept': 'application/json; charset=UTF-8'
       })
     })
       .then(res => {
        console.log('we in the first res ===>>',res);
         return res.json()
       })
       .then(
         (result) => {
          const highestMaxScore = Math.max(...result.map(member => member.score));
          console.log('result',result)
          console.log('likes',likes)
           const userCards = []
           result.map(user => {
             if(user.email != email & !likes.includes(user.email)){
              //TODO:calc score 0 to 100

              console.log('LOG 1' ,{ name: user.name,bio:user.bio,image:user.img ,email:user.email,score:user.score});
              userCards.push({ name: user.name,bio:user.bio,image:user.img ,email:user.email,score:(user.score/highestMaxScore*100)})
                // userCards.push({ name: user.name,bio:user.bio,image:user.img ,email:user.email,score:user.score})
             }
           }) 

           for (let i = userCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [userCards[i], userCards[j]] = [userCards[j], userCards[i]];
        }
        console.log('LOG 2');
           setCards(userCards)
          // setUser(result)
         },
         (error) => {
           console.log(" getSearchedUsers err get=", error);
         });
   }}, [likes]);
  
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
        console.log("FUNCTION => getLikes err get=", error);
      };
}

  //20/7
    function postMatch(user, targetUser,score){//send score between two users.
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?match1='+user+'&match2='+targetUser+'&score='+score
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
            console.log("postMatch err get=", error);
          });
    }


    async function handleYup (card) {
      email = await getData('@email')
      let apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?user='+email+'&targetUser='+card.email
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
              postMatch(props.username, card.email,card.score)
            }
          },
          (error) => {
            console.log("handleYup err get=", error);
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
      backgroundColor: "#79737345",
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
       score:{
      // backgroundColor:'blue'
      fontSize:20,
      fontWeight:'bold',
      color:'#4ac24a',
      marginBottom:20,
      marginLeft:10,
  },

    bio:{
        marginTop:10,
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
      marginTop:'20%'

    //   borderColor:'black',
    //   borderWidth:1,
    },
    
    cardsText: {
      fontSize: 22,
    },
  });