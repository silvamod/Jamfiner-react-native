import { sendUserDataToBackEnd } from "../utils/sendUserDataToBackEnd";

export const getUserDataFromSpotify = async (access_token: string) => {
  fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    }),
  })
    .then((response) => response.json())
    .then(async (data) => {
      await sendUserDataToBackEnd(data);
    }),
    (error) => {
      console.log("err get=", error);
    };
};

//apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=' + data.email+"&name="+data.display_name+"&bio="+ "spotify"+"&img="+data.images[0].url
