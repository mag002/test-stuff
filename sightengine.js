
// // if you haven't already, install the SDK with 'npm install sightengine --save'
var sightengine = require('sightengine')('860383348', 'tvEVh4X2CkA6J7eR5iKo');
const axios = require('axios');

const getStatus = () => {

    axios.get('https://api.sightengine.com/1.0/video/byid.json', {
        params: {
          'id': 'med_9fEaiskGvCNbhxThkda2N',
          'api_user': '1907836606',
          'api_secret': 'Eqtk4YbsjwnimgMV4dG6',
        }
      })
      .then(function (response) {
        // on success: handle response
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
      });
}
const stop = () => {
  
  data = {
    'id': 'med_9fEaiskGvCNbhxThkda2N',
    'api_user': '1907836606',
    'api_secret': 'Eqtk4YbsjwnimgMV4dG6',
  }
  
  axios.delete('https://api.sightengine.com/1.0/video/byid.json', {params: data})
  .then(function (response) {
    // on success: handle response
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    if (error.response) console.log(error.response.data);
    else console.log(error.message);
  });

}
// getStatus();
// stop();

const link = "https://live.api.video/li7bTGUHKxzDOaXgdQQIfaEY_480p/index.m3u8";
const hook = "http://cae582f9fc78.ngrok.io";

const startSight = () => {
    sightengine.check(['nudity','wad','properties','celebrities','face-attributes','text','offensive']).video(
      `${link}`,
       `${hook}/webhook`).then(function(result) {
        // The API response (result)
        console.log(result);
    }).catch(function(err) {
        // Handle error
        console.log(err);
    });

}
const videoReady = () => {
  console.log('videoready ex');
  axios.get(link)
  .then( (response) => {
    // on success: handle response
    if(response.status ==200){
         //yeah video is streaming!  
         console.log("FETCH SUCCESS!");
         startSight();
     } else{
        //not streaming yet - try again
        setTimeout(videoReady,1000);
     }
  })
  .catch(error =>{
    // handle error
    if (error.response.status===404){
      // on the left video show the red button mean I already start livestream
      // But the response from the m3u8 link is 404 not found
      console.log(error.response.status);
      setTimeout(videoReady,1000);
    }
  })
}

videoReady();