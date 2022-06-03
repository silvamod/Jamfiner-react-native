export interface SettingsInterface {
  email:string,
  miles: number;
  skill: string;
  male: boolean;
  female: boolean;
  selectedItems: any[];
}

export const updateUserSettigns = async (settings: SettingsInterface) => {
  //array to strings
  //boolean to string
  //number to string

  const rawResponse = await fetch('https://proj.ruppin.ac.il/bgroup63/test2/tar1/api/setting', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  });
  const content = await rawResponse.json();
  // console.log(content)
  try {
  } catch (error) {
    return error;
  }
};
