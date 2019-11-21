
const welcomeSmsIntent = agent => {
    agent.add(
      "Welcome to Endo AI. One stop to increase your online presence. To start process  \n Text 'Create Website',  'Purchase Domain' or  'Get Listed'"
    );  
  };


  module.exports = {  
    WelcomeSmsIntent:welcomeSmsIntent
  };