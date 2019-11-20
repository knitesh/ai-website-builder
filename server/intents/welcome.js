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

module.exports = {
    welcomeIntent : function (conv){
      if (conv.user.last.seen) {
        conv.ask('Welcome back! Say \'Create Website\', \'Purchase Domain\' or \'Get Listed\' to start the process!');
      } else {
        conv.ask('Welcome to Endo AI. One stop to increase your online presence. Just say \'Create Website\', \'Purchase Domain\' or \'Get Listed\' to start the process!')    
      }      
    
    conv.ask(new Suggestions(`Create website`));
    conv.ask(new Suggestions(`Purchase Domain`));
    conv.ask(new Suggestions(`Get Listed`));


  }}


  // module.exports = {} 
  /*
  module.exports = {
    method: function() {},
    otherMethod: function() {}
}
*/