import { getData } from "./storage";

export const getUserGenresFromSpotify = async (access_token: string) => {
  console.log("getUserGenresFromSpotify ENTER");
  fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10",
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      }),
    }
  )
    .then((response) => response.json())
    .then(async (data) => {
      console.log("getUserGenresFromSpotify INSD");
      var user_genres= data.items.map((artist) => {
        return artist.genres.map((genre) =>{
            return genre
        });
      });
      console.log("user_genres", user_genres.toString());
        return await sendUserGenresToBackEnd(user_genres)
    }),
    (error) => {
      console.log("err get=", error);
    };
};

const sendUserGenresToBackEnd = async (data: any) => {
  const email = await getData("@email");
  const apiurl = `https://proj.ruppin.ac.il/bgroup63/test2/tar1/user/addUserGenres?targetUser=${email}&genres=${data}`
  console.log(apiurl)
  fetch(
    apiurl,
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    }),
    (error) => {
      console.log("err get=", error);
    };
};
//apiUrl = 'https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/user?email=' + data.email+"&name="+data.display_name+"&bio="+ "spotify"+"&img="+data.images[0].url
