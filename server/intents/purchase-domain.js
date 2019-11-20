const fetch = require("node-fetch");
const {  Suggestion } = require('dialogflow-fulfillment')
const { Suggestions, List, Image } = require("actions-on-google");

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
        }
        return resolve();
      });
  });
};

const purchaseDomainSMS = (agent, param) => {
  console.log(param.parameters.domainName);
  
  const domainName = param.parameters.domainName.toLowerCase()
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
        const availableDomains = []

        let count = 0;
        results.forEach(element => {
          if (element.domainInfo.domain === domainName && count == 0) {
            domains.push({
              id : 0, 
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
              id : 1 + count,
              domainName: element.domainInfo.domain,
              availability: element.domainInfo.availability
            });
            count++;
          }
        });

        const domainAvailability = domains[0].availability;
        console.log(domains)
        console.log("domain availability =  ", domainAvailability);
        if (!domainAvailability) {
          agent.add(domains[0].domainName + " is not available.");
          
          domains.forEach(domain => {
            if (domain.availability) {
              // agent.add(domain.domainName);
              availableDomains.push(domain.domainName)
            }
          });
          const msg= "Here are few available domains  \n" + availableDomains.join('  \n').toString()
          agent.add(msg);
        } else {
          agent.add(
            domains[0].domainName + " is available. Do you want to buy it?"
          );
        }
        return resolve();
      });
  });
  // return new Promise((resolve, reject) => {
  //   // const endpoint = URL + domainName;
  //   // console.log(endpoint);
  //   const endpoint = `https://registration.domain.com/domains/search/${domainName}?suggestions=0&aftermarket=false&propertyID=47&searchTerm=${domainName}&currency=USD`;
  //   console.log(endpoint);

  //   fetch(endpoint, {
  //     method: "GET",
  //     headers: {}
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       const { results } = res;
  //       const domains = [];

  //       let count = 0;
  //       results.forEach(element => {
  //         if (element.domainInfo.domain === domainName && count == 0) {
  //           domains.push({
  //             domainName: element.domainInfo.domain,
  //             availability: element.domainInfo.availability
  //           });
  //           count += 1;
  //         }
  //       });
  //       count = 0; // reinitialize count
  //       results.forEach(element => {
  //         if (element.domainInfo.availability && count < 5) {
  //           domains.push({
  //             domainName: element.domainInfo.domain,
  //             availability: element.domainInfo.availability
  //           });
  //           count++;
  //         }
  //       });

  //       const domainAvailability = domains[0].availability;
  //       console.log("domain availability =  ", domainAvailability);
  //       if (!domainAvailability) {
  //         conv.ask(domains[0].domainName + " is not available.");
  //         conv.ask("Here are few available domains");
  //         domains.forEach(domain => {
  //           if (domain.availability) {
  //             conv.ask(new Suggestions(domain.domainName));
  //           }
  //         });
  //       } else {
  //         conv.ask(
  //           domains[0].domainName + " is available. Do you want to buy it?"
  //         );
  //       }
  //       return resolve();
  //     });
  // });
};

module.exports = {
  PurchaseDomainIntent: purchaseDomain,
  PurchaseDomainSmsIntent: purchaseDomainSMS
};
