
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
//https://innojam-webai.azurewebsites.net/webai
'use strict';
const express = require('express')
const path = require('path')
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
const { WebhookClient} = require('dialogflow-fulfillment')



// Import the service function and various response classes
const {
  dialogflow
} = require('actions-on-google');



const {welcomeIntent, welcomeSmsIntent} = require('./server/intents/welcome')
const {PurchaseDomainIntent, PurchaseDomainSmsIntent} = require('./server/intents/purchase-domain')
const {fallbackIntent,fallbackSmsIntent, DisplayOptions} = require('./server/intents/fallback')
const {CreateWebsiteIntent,CreateWebsiteStep3Intent, CreateWebsiteStep2Intent } = require('./server/intents/build-website')
const port = process.env.PORT || 3000;

const expressApp = express().use(bodyParser.json());

const dialogflowApp = dialogflow();

// Welcome Intent
dialogflowApp.intent('Default Welcome Intent', (conv)=> welcomeIntent(conv));

dialogflowApp.intent('Default Fallback Intent', (conv)=> fallbackIntent(conv)); 
dialogflowApp.intent('Create Website', (conv)=> CreateWebsiteIntent(conv));
dialogflowApp.intent('Create Website - Step2 - Start Creating New WebPage', (conv,param)=> CreateWebsiteStep2Intent(conv,param));
dialogflowApp.intent('Create Website - Step3 - Start Creating New WebPage', (conv,params, option)=> CreateWebsiteStep3Intent(conv,params, option));
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

expressApp.post('/webaisms',(req, res) => {
  
  const agent = new WebhookClient({ request: req, response: res })

  console.log("\n\n************************************************\n")
  // console.log('Dialogflow Request headers: \n' + JSON.stringify(req.headers));
  console.log("\n\n************************************************\n")
  // console.log('Dialogflow Request body: \n' + JSON.stringify(req.body));
  console.log('queryText: \n' + JSON.stringify(req.body.queryResult.queryText));
  console.log('fulfillmentText: \n' + JSON.stringify(req.body.queryResult.fulfillmentText));
  console.log('fulfillmentText: \n' + JSON.stringify(req.body.queryResult.parameters));
  console.log("\n\n************************************************")
 

  // const welcomeHandler = () => welcomeSmsIntent(agent)

  // const fallbackHandler = () => fallbackSmsIntent(agent)

  // const BuildAWebsiteStep1Handler = () =>BuildAWebsiteStep1SmsIntent(agent)

  // const BuildAWebsiteStep2Handler = () =>BuildAWebsiteStep2SmsIntent(agent)

  const PurchaseDomainHandler = () => PurchaseDomainSmsIntent(agent,req.body.queryResult)

  // const BuildAWebsiteStep2Handler = () =>BuildAWebsiteStep2Intent(agent)

  let intentMap = new Map()

  // intentMap.set('Default Welcome Intent', welcomeHandler)
  // intentMap.set('Default Fallback Intent', fallbackHandler); 
  // intentMap.set('Create Website', BuildAWebsiteStep1Handler);
  // intentMap.set('BuildAWebsite - build website-Step2', BuildAWebsiteStep2Handler);
  intentMap.set('Purchase Domain', PurchaseDomainHandler);


  try{
    agent.handleRequest(intentMap)
  }catch(err){
    console.log(err)
  }
  
}) 

