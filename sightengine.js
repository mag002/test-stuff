
// // if you haven't already, install the SDK with 'npm install sightengine --save'
var sightengine = require('sightengine')('33486316', 'Nspa3BYvkXkqvdrVcMLb');
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

const startSight = () => {
    sightengine.check(['nudity','wad','properties','celebrities','face-attributes','text','offensive']).video('https://live.api.video/li2ISlOduGqqpeFSUm9rXt81.m3u8', 'http://337a7c7d913c.ngrok.io/webhook').then(function(result) {
        // The API response (result)
        console.log(result);
    }).catch(function(err) {
        // Handle error
        console.log(err);
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
startSight();