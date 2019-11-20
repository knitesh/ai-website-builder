const {  Card, Suggestions, Image  } = require('actions-on-google');

module.exports = {
    GmbStep1Intent : function (agent){
        conv.ask(`Great23, lets build a website. But before that I will need few basic information. Let me know when you are ready.`);   
        conv.ask(new Suggestions(`Ok`));
        conv.ask(new Suggestions(`Ready`));
        conv.ask(new Suggestions(`Let's do it.`));
  },
  GmbStep2Intent : function (agent){
    conv.ask(`Hold Tight23, we are working on creating a new URL for your awesome website.`);
    conv.ask( new Image('https://cloud.peachd.com/prod/images/gateway_v2/intro/menus.png'))
    conv.ask(new Card({
        title: `Title: this is a card title`,
        imageUrl: 'https://cloud.peachd.com/prod/images/gateway_v2/intro/menus.png',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
}
}

