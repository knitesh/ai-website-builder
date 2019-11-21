const fetch = require("node-fetch");
const find = require('lodash/find');
const {  Suggestion } = require('dialogflow-fulfillment')
const { Suggestions, List, Image, BasicCard, Button } = require("actions-on-google");



const WHOIS_API_KEY = `at_K6Mkg28rXx6seuy8XgrpS6BhNO3vT`;
const URL = `https://domain-availability-api.whoisxmlapi.com/api/v1?apiKey=${WHOIS_API_KEY}&domainName=`;

const purchaseDomain = (conv, { domainName }) => {
  console.log(domainName);
  return new Promise((resolve, reject) => {
    // const endpoint = URL + domainName;
    // console.log(endpoint);
    const endpoint = `https://registration.domain.com/domains/search/${domainName}?suggestions=0&aftermarket=false&propertyID=47&searchTerm=${domainName}&currency=USD`;
    console.log(endpoint);

    fetch(endpoint, {
      method: "GET",
      headers: {}
    })
      .then(res => res.json())
      .then(res => {
        const { results } = res;
        const domains = [];

        let count = 0;
        results.forEach(element => {
          if (element.domainInfo.domain === domainName && count == 0) {
            domains.push({
              domainName: element.domainInfo.domain,
              availability: element.domainInfo.availability
            });
            count += 1;
          }
        });
        count = 0; // reinitialize count
        results.forEach(element => {
          if (element.domainInfo.availability && count < 5) {
            domains.push({
              domainName: element.domainInfo.domain,
              availability: element.domainInfo.availability
            });
            count++;
          }
        });

        const domainAvailability = domains[0].availability;
        console.log("domain availability =  ", domainAvailability);
        if (!domainAvailability) {
          conv.ask(domains[0].domainName + " is not available.");
          conv.ask("Here are few available domains");
          domains.forEach(domain => {
            if (domain.availability) {
              conv.ask(new Suggestions(domain.domainName));
            }
          });
        } else {
          conv.ask(
            domains[0].domainName + " is available. Do you want to buy it?"
          );
          conv.contexts.set('buy-available-domain', 5, {availableDomain: domains[0].domainName} );
        }
        return resolve();
      });
  });
};


const purchaseDomainYes = (conv) => {
  const {availableDomain} = conv.contexts.get('buy-available-domain').parameters 

    conv.ask('Great!')
    conv.ask(new BasicCard({
      text: `Click on below button to enter your billing information`,
      subtitle: '',
      title: availableDomain,
      buttons: new Button({
        title: 'Checkout',
        url: `https://innojam-webai.azurewebsites.net/checkout.html?urlName=${availableDomain}`,
      }),
      image: new Image({
        url: 'https://innojam-webai.azurewebsites.net/endo.svg',
        alt: 'Endo Checkout',
      }),
      display: 'CROPPED',   
  }));
  conv.ask('What do you want to do next?')
  conv.ask(new Suggestions(`Create website`));
  conv.ask(new Suggestions(`Get Listed`));
}


module.exports = {
  PurchaseDomainIntent: purchaseDomain,
  PurchaseDomainYesIntent: purchaseDomainYes
};
