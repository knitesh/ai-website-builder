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
        description: 'This is a description of a carousel item.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Image alternate text',
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
        description: 'Google Home is a voice-activated speaker powered by ' +
          'the Google Assistant.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Home',
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
        description: 'Pixel. Phone by Google.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Pixel',
        }),
      },
    },
  }));

  conv.contexts.set('theme-selected', 5, param);
  // const {websiteName,websiteCategory,websiteDescription} = param
  // const websiteURL = websiteName.replace(' ','_')+'.constantcontact.online'
  // conv.ask(`Here's your awesome website`);
  // conv.ask(new BasicCard({
  //   text: websiteDescription, // Note the two spaces before '\n' required for
  //                                // a line break to be rendered in the card.
  //   subtitle: websiteCategory,
  //   title: websiteName,
  //   buttons: new Button({
  //     title: 'View your website',
  //     url: `https://${websiteURL}/`,
  //   }),
  //   image: new Image({
  //     url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
  //     alt: websiteName,
  //   }),
  //   display: 'CROPPED',
  // }));
  // conv.ask('What you want to do next?');
  // conv.ask(new Suggestions(`Purchase Domain`));
  // conv.ask(new Suggestions(`Get listed on Google`));
 
}

const CreateWebsiteStep3Intent = (conv,params, option) =>{

  // const {websiteName,websiteCategory,websiteDescription} = conv.contexts.get('theme-selected')
   console.log(params, option)
    const SELECTED_ITEM_RESPONSES = {
      'SELECTION_KEY_THEME_ONE': 'selected Theme 1',
      'SELECTION_KEY_THEME_TWO': 'selected Theme 2',
      'SELECTION_KEY_THEME_THREE': 'saelected Theme 3',
    };

  //  conv.ask(SELECTED_ITEM_RESPONSES[option]);
  const {websiteName,websiteCategory,websiteDescription} = conv.contexts.get('theme-selected').parameters
  const websiteURL = websiteName.replace(' ','_')+'.constantcontact.online'
  conv.ask(`Here's your awesome website with `+ (option && SELECTED_ITEM_RESPONSES[option]) || (params && SELECTED_ITEM_RESPONSES[params.selectedTheme]));
  conv.ask(new BasicCard({
    text: websiteDescription, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: websiteCategory,
    title: websiteName,
    buttons: new Button({
      title: 'View your website',
      url: `https://${websiteURL}/`,
    }),
    image: new Image({
      url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
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

