
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
//https://innojam-webai.azurewebsites.net/webai
'use strict';
const express = require('express')
const path = require('path')
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
const { WebhookClient,Card, Suggestion } = require('dialogflow-fulfillment')



// Import the service function and various response classes
const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
  Permission
} = require('actions-on-google');



const {welcomeIntent} = require('./server/intents/welcome')
const {PurchaseDomainIntent} = require('./server/intents/purchase-domain')
const {fallbackIntent, DisplayOptions} = require('./server/intents/fallback')
const {BuildAWebsiteStep1Intent,BuildAWebsiteStep2Intent} = require('./server/intents/build-website')
const port = process.env.PORT || 3000;

const expressApp = express().use(bodyParser.json());

const dialogflowApp = dialogflow();

// Welcome Intent
dialogflowApp.intent('Default Welcome Intent', (conv)=> welcomeIntent(conv));

dialogflowApp.intent('Default Fallback Intent', (conv)=> fallbackIntent(conv)); 
dialogflowApp.intent('Create Website', (conv)=> BuildAWebsiteStep1Intent(conv));
dialogflowApp.intent('BuildaWebsite - build website-Step2', (conv)=> BuildAWebsiteStep2Intent(conv));
dialogflowApp.intent('Purchase Domain', (conv,param)=> PurchaseDomainIntent(conv,param));
dialogflowApp.intent('Show Display Options',(conv) => DisplayOptions(conv))

expressApp.listen(port, () => console.log(`Listening on port ${port}`));

expressApp.use(express.static(path.join(__dirname, 'client/build')))

expressApp.use(basicAuth( { authorizer: basicAuthorizer } ))
 
function basicAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, 'endoInnoJam2019')
    const passwordMatches = basicAuth.safeCompare(password, 'endoWebAI')
 
    return userMatches & passwordMatches
}

expressApp.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

expressApp.get('/status', (req, res) => res.send('Up and running'))

expressApp.post('/webai', dialogflowApp)

