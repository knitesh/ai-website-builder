const {  Card, Suggestions, Image  } = require('actions-on-google');

const fetch = require("node-fetch");
const find = require("lodash/find");

const gmbListingYes = (conv, param) => {
  const { businessName, businessCategory, businessAddress,businessPhone } = param;

  return new Promise((resolve, reject) => {
    
    const jsonBody = {
      business_name: businessName,
      business_category: businessCategory,
      business_address: businessAddress,
      business_phone: businessPhone
    };

    // console.log(JSON.stringify(jsonBody))

    fetch("https://business-info-api.qa.ctctdev.co/v1.0/business_location/innojam", {
      method: "POST",      
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(jsonBody),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.status_code >= 400) {
          conv.ask(json.message);
        } else {
          conv.ask(
            `Location listing completed. Follow below link to verify and make it live.  \n ${json.return_url}`
          );
        }
        resolve();
      });   
  });
};

module.exports = {
  GmbListingYesIntent: gmbListingYes
};


