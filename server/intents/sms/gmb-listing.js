const fetch = require("node-fetch");
const find = require("lodash/find");

const gmbListingYes = (agent, param) => {
  const { businessName, businessCategory, businessAddress,businessPhone } = param.parameters;

  return new Promise((resolve, reject) => {
    // const endpoint = `https://business-info-api.qa.ctctdev.co/v1.0/business_location/innojam`;
    // console.log(endpoint);

    const jsonBody = {
      business_name: businessName,
      business_category: businessCategory,
      business_address: businessAddress,
      business_phone: businessPhone
    };

    console.log(JSON.stringify(jsonBody))

    fetch("https://business-info-api.qa.ctctdev.co/v1.0/business_location/innojam", {
      method: "POST",      
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(jsonBody),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.status_code >= 400) {
          agent.add(json.message);
        } else {
          agent.add(
            `Location listing completed. Follow below link to verify and make it live.  \n ${json.return_url}`
          );
        }
        resolve();
      });
    // fetch(
    //   "https://business-info-api.qa.ctctdev.co/v1.0/business_location/innojam",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8",
    //       Cookie: "__cfduid=d7e4eacd733f297c997cbb271d7b19aea1565883978"
    //     },
    //     body:
    //       '{"business_name":"Kathryn\'s test 2","business_category":"Computer consultant","business_address":"103 Drummer Rd 01720","business_phone":"781-202-3456"}'
    //   }
    // )
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .catch(console.error.bind(console));
  });
};

module.exports = {
  GmbListingYesSmsIntent: gmbListingYes
};
