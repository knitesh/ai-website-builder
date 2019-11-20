const {
    dialogflow,
    SimpleResponse,
    BasicCard,
    Button,
    Image,
    BrowseCarousel,
    BrowseCarouselItem,
    Suggestions,
    LinkOutSuggestion,
    MediaObject,
    Table,
    List,
    Carousel,
  } = require('actions-on-google');

const displayOptions = (conv) =>{


    conv.ask(new BrowseCarousel({
        items: [
          new BrowseCarouselItem({
            title: 'Title of item 1',
            url: 'https://example.com',
            description: 'Description of item 1',
            image: new Image({
              url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
              alt: 'Image alternate text',
            }),
            footer: 'Item 1 footer',
          }),
          new BrowseCarouselItem({
            title: 'Title of item 2',
            url: 'https://example.com',
            description: 'Description of item 2',
            image: new Image({
              url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
              alt: 'Image alternate text',
            }),
            footer: 'Item 2 footer',
          }),
        ],
      }));
      conv.ask('This is a list example.');
  // Create a list
  conv.ask(new List({
    title: 'List Title',
    items: {
      // Add the first item to the list
      'SELECTION_KEY_ONE': {
        synonyms: [
          'synonym 1',
          'synonym 2',
          'synonym 3',
        ],
        title: 'Title of First List Item',
        description: 'This is a description of a list item.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Image alternate text',
        }),
      },
      // Add the second item to the list
      'SELECTION_KEY_GOOGLE_HOME': {
        synonyms: [
          'Google Home Assistant',
          'Assistant on the Google Home',
      ],
        title: 'Google Home',
        description: 'Google Home is a voice-activated speaker powered by ' +
          'the Google Assistant.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Home',
        }),
      },
      // Add the third item to the list
      'SELECTION_KEY_GOOGLE_PIXEL': {
        synonyms: [
          'Google Pixel XL',
          'Pixel',
          'Pixel XL',
        ],
        title: 'Google Pixel',
        description: 'Pixel. Phone by Google.',
        image: new Image({
          url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
          alt: 'Google Pixel',
        }),
      },
    },
  }));
      conv.ask(new BasicCard({
          title: `Title: this is a card title`,
          image: new Image({
            url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
            alt: 'Image alternate text',
          }),
          text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
          buttons: new Button({
            title: 'This is a button',
            url: 'https://assistant.google.com/',
          }),
        })
      );
}

module.exports = {
    DisplayOptions: displayOptions,
    fallbackIntent : function (conv){
        conv.ask(`I'm sorry, can you try again?`);
        conv.ask(new Suggestions(`Create Website`));
        conv.ask(new Suggestions(`Purchase Domain`));
        conv.ask(new Suggestions(`Get Listed`));
  }}

