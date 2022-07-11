import { storeData } from "./storage";

export const sendUserDataToBackEnd = async (data: any) => {
  await storeData("@email", data.email);
  console.log(data.images[0].url, "data.images[0].url");

  fetch(
    //user/addOrUpdateUser
    `https://proj.ruppin.ac.il/bgroup63/test2/tar1/user/addOrUpdateUser?email=${data.email}&name=${data.display_name}&bio=new user from spotify :)&img=${data.images[0].url}`,

    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {}),
    (error) => {
      console.log("err get=", error);
    };
};

//apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=' + data.email+"&name="+data.display_name+"&bio="+ "spotify"+"&img="+data.images[0].url
