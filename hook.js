// This example uses Express to receive callbacks
const app = require('express')();
const express = require('express')
// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.get('/',(req,res)=>{
    console.log('ok');
})

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  let event;

  // content = JSON.parse(request.body);
    console.log(request.body);
  // You now have access to the following:
  // the media id => content.media.id
  // the moderation data => content.data
  // the moderation status => content.data.status

  // Acknowledge receipt
  response.json({received: true});
});

app.listen(8000, () => console.log('Running on port 8000'));