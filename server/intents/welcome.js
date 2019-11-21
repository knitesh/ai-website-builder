const {
  Suggestions 
} = require("actions-on-google");



const welcomeIntent = conv => {
  if (conv.user.last.seen) {
    conv.ask(
      "Welcome back! Say or Type 'Create Website', 'Purchase Domain' or 'Get Listed' to start the process!"
    );
  } else {
    conv.ask(
      "Welcome to Endo. One stop to increase your online presence. Say or Type 'Create Website', 'Purchase Domain' or 'Get Listed' to start the process!"
    );
  }

  conv.ask(new Suggestions(`Create website`));
  conv.ask(new Suggestions(`Purchase Domain`));
  conv.ask(new Suggestions(`Get Listed`));
};


module.exports = {  
  WelcomeIntent: welcomeIntent
};

// module.exports = {}
/*
  module.exports = {
    method: function() {},
    otherMethod: function() {}
}
*/
