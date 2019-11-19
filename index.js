
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
//https://innojam-webai.azurewebsites.net/webai
'use strict';
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const { WebhookClient,Card, Suggestion, Image } = require('dialogflow-fulfillment')

const port = process.env.PORT || 3000;

const app = express()


app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/status', (req, res) => res.send('Up and running'))

app.post('/webai', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })
  console.log("\n\n************************************************\n")
  console.log('Dialogflow Request headers: \n' + JSON.stringify(req.headers));
  console.log("\n\n************************************************\n")
  console.log('Dialogflow Request body: \n' + JSON.stringify(req.body));
  console.log("\n\n************************************************")
 

  function welcome () {
    agent.add('Hello! Welcome to Website Builder.One stop to increase your online presence. Just say \'Create Website\' to start the process!')
    
    agent.add(new Card({
      title: `Title: this is a card title`,
      imageUrl: 'https://cloud.peachd.com/prod/images/gateway_v2/intro/menus.png',
      text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
      buttonText: 'This is a button',
      buttonUrl: 'https://assistant.google.com/'
    }));
    agent.add(new Suggestion(`Create website`));
    agent.add(new Suggestion(`Build website`));
  }

  function signIn(app) {
    app.askForSignIn();
  }
  function signInHandler(app) {
    if (app.getSignInStatus() === app.SignInStatus.OK) {
      let accessToken = app.getUser().accessToken;
    } else {
      app.tell('You need to sign-in before using the app.');
    }
  }
  function fallback(agent) {
    agent.add(`I'm sorry, can you try again?`);
    agent.add(new Suggestion(`Create Website`));
  }

  function gatherInformation(agent){
    agent.add(`Great, lets build a website. But before that I will need few basic information. Let me know when you are ready.`);   
    agent.add(new Suggestion(`Ok`));
    agent.add(new Suggestion(`Ready`));
    agent.add(new Suggestion(`Let's do it.`));
  }
  function generateWebsiteUrl(agent) {
    agent.add(`Hold Tight, we are working on creating a new URL for your awesome website.`);
    agent.add( new Image('https://cloud.peachd.com/prod/images/gateway_v2/intro/menus.png'))
    agent.add(new Card({
        title: `Title: this is a card title`,
        imageUrl: 'https://cloud.peachd.com/prod/images/gateway_v2/intro/menus.png',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
    // agent.add(new Suggestion(`Quick Reply`));
    // agent.add(new Suggestion(`Suggestion`));
    // agent.context.set({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('BuildAWebsite - build website-Step2', generateWebsiteUrl);
  intentMap.set('BuildAWebsite- Step 1', gatherInformation);
  agent.handleRequest(intentMap)
  
}) 
