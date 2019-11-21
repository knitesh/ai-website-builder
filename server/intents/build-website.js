const {  Suggestions, Image,BasicCard, Button, Carousel } = require('actions-on-google');


const CreateWebsiteIntent =  (conv) =>{
  conv.ask(`Great, lets build a website. But before that I will need few basic information. Let me know when you are ready.`);   
  conv.ask(new Suggestions(`Ok`));
  conv.ask(new Suggestions(`Ready`));
  conv.ask(new Suggestions(`Let's do it.`));
}

const CreateWebsiteStep1Intent =  (conv) => {
  conv.ask(`Hold Tight, we are working on creating a new URL for your awesome website.`);
 
}

const CreateWebsiteStep2Intent =  (conv,param) => {
  // console.log(param)
  conv.ask('Select a theme for your website');
  // Create a carousel
  conv.ask(new Carousel({
    title: 'Website Theme',
    items: {
      // Add the first item to the carousel
      'SELECTION_KEY_THEME_ONE': {
        synonyms: [
          'Theme 1',
          'Theme one',
          'Theme A',
        ],
        title: 'Theme 1',
        description: 'Type "Theme 1" to select this theme',
        image: new Image({
          url: 'https://innojam-webai.azurewebsites.net/theme1.png',
          alt: 'Theme 1',
        }),
      },
      // Add the second item to the carousel
      'SELECTION_KEY_THEME_TWO': {
        synonyms: [
          'Theme 2',
          'Theme two',
          'Theme B',
      ],
        title: 'Theme 2',
        description: 'Type "Theme 2" to select this theme',
        image: new Image({
          url: 'https://innojam-webai.azurewebsites.net/theme2.png',
          alt: 'Theme 2',
        }),
      },
      // Add the third item to the carousel
      'SELECTION_KEY_THEME_THREE': {
        synonyms: [
          'Theme 3',
          'Theme three',
          'Theme C',
        ],
        title: 'Theme 3',
        description: 'Type "Theme 3" to select this theme',
        image: new Image({
          url: 'https://innojam-webai.azurewebsites.net/theme3.png',
          alt: 'Theme 3',
        }),
      },
    },
  }));

  conv.contexts.set('theme-selected', 5, param); 
  
 
}

const CreateWebsiteStep3Intent = (conv,params, option) =>{

  // const {websiteName,websiteCategory,websiteDescription} = conv.contexts.get('theme-selected')
   console.log(params, option)
   
    const SELECTED_ITEM_RESPONSES = {
      'SELECTION_KEY_THEME_ONE': 'selected Theme 1',
      'SELECTION_KEY_THEME_TWO': 'selected Theme 2',
      'SELECTION_KEY_THEME_THREE': 'saelected Theme 3',
    };

    const stringPart2 = (option && SELECTED_ITEM_RESPONSES[option]) || (params && SELECTED_ITEM_RESPONSES[params.selectedTheme]) 
   

  //  conv.ask(SELECTED_ITEM_RESPONSES[option]);
  const {websiteName,websiteCategory,websiteDescription} = conv.contexts.get('theme-selected').parameters
  const websiteURL = `https://innojam-webai.azurewebsites.net/generatedSite.html?businessName=${websiteName}&businessCategory=${websiteCategory}&businessDescription=${websiteDescription}`

  conv.ask(`Here's your awesome website with ${stringPart2}`);


  conv.ask(new BasicCard({
    text: websiteDescription, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: websiteCategory,
    title: websiteName,
    buttons: new Button({
      title: 'View your website',
      url: websiteURL,
    }),
    image: new Image({
      url: 'https://innojam-webai.azurewebsites.net/endo.svg',
      alt: websiteName,
    }),
    display: 'CROPPED',
  }));
  conv.ask('What you want to do next?');
  conv.ask(new Suggestions(`Purchase Domain`));
  conv.ask(new Suggestions(`Get listed on Google`));
  
}
module.exports = {
  CreateWebsiteIntent,CreateWebsiteStep1Intent, CreateWebsiteStep2Intent ,CreateWebsiteStep3Intent
}

