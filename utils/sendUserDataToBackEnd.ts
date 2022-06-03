export const sendUserDataToBackEnd = async (data:any) => {
    fetch(`https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=${data.email}&name=${data.display_name}&bio=spotify&img=${data.images[0].url}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    }).then(response => response.json())
      .then((data)=>{
    }),
      (error) => {
        console.log("err get=", error);
      };
  };
  
  //apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=' + data.email+"&name="+data.display_name+"&bio="+ "spotify"+"&img="+data.images[0].url
  
  