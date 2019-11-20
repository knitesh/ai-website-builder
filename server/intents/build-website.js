const {  Suggestions, Image, } = require('actions-on-google');


const createWebsiteStep1 =  (conv) =>{
  conv.ask(`Great, lets build a website. But before that I will need few basic information. Let me know when you are ready.`);   
  conv.ask(new Suggestions(`Ok`));
  conv.ask(new Suggestions(`Ready`));
  conv.ask(new Suggestions(`Let's do it.`));
}

const createWebsiteStep2 =  (conv) => {
  conv.ask(`Hold Tight, we are working on creating a new URL for your awesome website.`);
  conv.ask( new Image('https://cloud.peachd.com/prod/images/gateway_v2/intro/menus.png'))
 
}
module.exports = {
    BuildAWebsiteStep1Intent : createWebsiteStep1,
  BuildAWebsiteStep2Intent : createWebsiteStep2
}

