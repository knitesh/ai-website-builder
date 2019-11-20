const {
 
  Suggestions,
  
} = require("actions-on-google");

const { WebhookClient,Card, Suggestion, Image } = require('dialogflow-fulfillment')

const welcomeIntent = conv => {
  if (conv.user.last.seen) {
    conv.ask(
      "Welcome back! Say 'Create Website', 'Purchase Domain' or 'Get Listed' to start the process!"
    );
  } else {
    conv.ask(
      "Welcome to Endo AI. One stop to increase your online presence. Just say 'Create Website', 'Purchase Domain' or 'Get Listed' to start the process!"
    );
  }

  conv.ask(new Suggestions(`Create website`));
  conv.ask(new Suggestions(`Purchase Domain`));
  conv.ask(new Suggestions(`Get Listed`));
};
const welcomeSmsIntent = agent => {
  agent.add(
    "Welcome to Endo AI. One stop to increase your online presence. Just say 'Create Website', 'Purchase Domain' or 'Get Listed' to start the process!"
  );

  agent.add(new Suggestion(`Create website`));
  agent.add(new Suggestion(`Purchase Domain`));
  agent.add(new Suggestion(`Get Listed`));
};

module.exports = {
  
  welcomeIntent,
  welcomeSmsIntent,
};

// module.exports = {}
/*
  module.exports = {
    method: function() {},
    otherMethod: function() {}
}
*/
