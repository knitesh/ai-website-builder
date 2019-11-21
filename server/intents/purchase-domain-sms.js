const fetch = require("node-fetch");
const find = require("lodash/find");
const { Card } = require("dialogflow-fulfillment");

const purchaseDomainSMS = (agent, param) => {
  console.log(param.parameters.domainName);

  const domainName = param.parameters.domainName.toLowerCase();
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
        const availableDomains = [];

        let count = 0;
        results.forEach(element => {
          if (element.domainInfo.domain === domainName && count == 0) {
            domains.push({
              id: 0,
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
              id: 1 + count,
              domainName: element.domainInfo.domain,
              availability: element.domainInfo.availability
            });
            count++;
          }
        });

        const domainAvailability = domains[0].availability;
        console.log(domains);
        console.log("domain availability =  ", domainAvailability);
        if (!domainAvailability) {
          agent.add(domains[0].domainName + " is not available.");

          domains.forEach(domain => {
            if (domain.availability) {
              // agent.add(domain.domainName);
              availableDomains.push(domain.domainName);
            }
          });
          const msg =
            "Here are few available domains  \n" +
            availableDomains.join("  \n").toString();
          agent.add(msg);
        } else {
          agent.add(
            domains[0].domainName + " is available. Do you want to buy it?"
          );

          agent.context.set({
            name: "buy-available-domain",
            lifespan: 5,
            parameters: {
              availableDomain: domains[0].domainName
            }
          });
        }
        return resolve();
      });
  });
};

const purchaseDomainYesSMS = agent => {
  // const {availableDomain} = agent.contexts.get('buy-available-domain').parameters

  const { availableDomain } = find(agent.contexts, {
    name: "buy-available-domain"
  }).parameters;

  agent.add(
    "Great!Click on below link to enter your billing information and owning this awesome site",
    availableDomain
  );
  agent.add(
    `https://innojam-webai.azurewebsites.net/checkout.html?urlName=${availableDomain}`
  );
};

module.exports = {
  PurchaseDomainSmsIntent: purchaseDomainSMS,
  PurchaseDomainYesSMSIntent: purchaseDomainYesSMS
};
