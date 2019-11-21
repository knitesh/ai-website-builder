const fetch = require("node-fetch");
const find = require("lodash/find");


const CreateWebsiteIntentSMS =  (agent) =>{
  agent.add(`Great, lets build a website. But before that I will need few basic information. Let me know when you are ready.`);    
}

const CreateWebsiteStep1IntentSMS =  (agent) => {
  agent.add(`Hold Tight, we are working on creating a new URL for your awesome website.`);
 
}

const CreateWebsiteStep2IntentSMS =  (agent,param) => {
    const {websiteName,websiteCategory,websiteDescription} = param
    const websiteURL = `https://innojam-webai.azurewebsites.net/generatedSite.html?businessName=${websiteName}&businessCategory=${websiteCategory}&businessDescription=${websiteDescription}`

    agent.add(`Here's your awesome website with  \n ${websiteURL}`);
}
  // Create a carousel
//   conv.contexts.set('theme-selected', 5, param); 
//   agent.context.set({
//     name: "theme-selected",
//     lifespan: 5,
//     parameters: {
//       availableDomain: domains[0].domainName
//     }
//   });
  
 
// }

const CreateWebsiteStep3IntentSMS = (agent,param) =>{

   const {websiteName,websiteCategory,websiteDescription} = param
   
    // const SELECTED_ITEM_RESPONSES = {
    //   'SELECTION_KEY_THEME_ONE': 'selected Theme 1',
    //   'SELECTION_KEY_THEME_TWO': 'selected Theme 2',
    //   'SELECTION_KEY_THEME_THREE': 'saelected Theme 3',
    // };

    // const stringPart2 = (option && SELECTED_ITEM_RESPONSES[option]) || (params && SELECTED_ITEM_RESPONSES[params.selectedTheme]) 
   

//   //  agent.add(SELECTED_ITEM_RESPONSES[option]);
//   const {websiteName,websiteCategory,websiteDescription} = conv.contexts.get('theme-selected').parameters

   const websiteURL = `https://innojam-webai.azurewebsites.net/generatedSite.html?businessName=${websiteName}&businessCategory=${websiteCategory}&businessDescription=${websiteDescription}`

   agent.add(`Here's your awesome website with  \n ${websiteURL}`);

//   agent.add(new BasicCard({
//     text: websiteDescription, // Note the two spaces before '\n' required for
//                                  // a line break to be rendered in the card.
//     subtitle: websiteCategory,
//     title: websiteName,
//     buttons: new Button({
//       title: 'View your website',
//       url: websiteURL,
//     }),
//     image: new Image({
//       url: 'https://innojam-webai.azurewebsites.net/endo.svg',
//       alt: websiteName,
//     }),
//     display: 'CROPPED',
//   }));
  agent.add('What you want to do next? Type Purchase Domain or Get listed on Google');
//   agent.add(new Suggestions(`Purchase Domain`));
//   agent.add(new Suggestions(`Get listed on Google`));
  
}
module.exports = {
  CreateWebsiteIntentSMS,CreateWebsiteStep1IntentSMS ,CreateWebsiteStep2IntentSMS, CreateWebsiteStep3IntentSMS
}

