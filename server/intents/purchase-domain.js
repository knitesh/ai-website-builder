const fetch = require("node-fetch");
const { Suggestions, List, Image } = require("actions-on-google");

const WHOIS_API_KEY = `at_K6Mkg28rXx6seuy8XgrpS6BhNO3vT`;
const URL = `https://domain-availability-api.whoisxmlapi.com/api/v1?apiKey=${WHOIS_API_KEY}&domainName=`;

const purchaseDomain = (conv, { domainName }) => {
  return new Promise((resolve, reject) => {
      const endpoint = URL + domainName
      console.log(endpoint)
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        if (json.code >= 400) {
          console.log(json);          
          conv.ask(json.messages);
        //   return reject();
        } else {
          const domainAvailability = json.DomainInfo.domainAvailability;
          console.log("domain name is ", domainAvailability)
          if (domainAvailability === "UNAVAILABLE") {
            conv.ask(domainName + " is not available.");
          } else {
            conv.ask(domainName + " is available. Do you want to buy it?");
          }
        }
        return resolve();
      });
  });
};

module.exports = {
  PurchaseDomainIntent: purchaseDomain
};
