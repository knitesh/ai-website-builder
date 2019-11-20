const fetch = require("node-fetch");

const searchDomain = (searchTerm = 'kumarnitesh.com') => {
   
    fetch(`https://registration.domain.com/domains/search/${searchTerm}?suggestions=0&aftermarket=false&propertyID=47&searchTerm=${searchTerm}&currency=USD`, {
      "method": "GET",
      "headers": {}
})
.then((res) => res.json())
.then(res =>{
    const {results} = res
    const domains =[]

    let count = 0
    results.forEach(element => {
        if(element.domainInfo.domain === searchTerm && count == 0){
            domains.push({
                domainName:element.domainInfo.domain,
                availability: element.domainInfo.availability
            })
            count+=1
        }
    });
     count = 0
    results.forEach(element => {
        if(element.domainInfo.availability && count < 5){
            domains.push({
                domainName:element.domainInfo.domain,
                availability: element.domainInfo.availability
            })
            count ++
        }
    });
 
domains.forEach(domain => {
        console.log(domain)
    })

    // return domains
   
})
.catch(console.error.bind(console));

}

searchDomain()