export const sendUserDataToBackEnd = async (data:any) => {
    console.log('getUserDataFromSpotify ENTER')
    fetch(`https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=${data.email}&name=${data.display_name}&bio=spotify&img=${data.images[0].url}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    }).then(response => response.json())
      .then((data)=>{
      console.log("https://api.spotify.com/v1/me", data);
    }),
      (error) => {
        console.log("err get=", error);
      };
  };
  
  //apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=' + data.email+"&name="+data.display_name+"&bio="+ "spotify"+"&img="+data.images[0].url
  
  