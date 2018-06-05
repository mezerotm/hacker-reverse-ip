const getReverseIP = require('./getReverseIP')
const getWhoIs = require('./getWhoIs')
const getHttpHeaders = require('./getHttpHeaders')

async function getDomains(urls) {
  console.log('getting reverse IP...')
  try {
    let domains = []
    for(let url of urls) {
      console.log(url)
      domains.push(await getReverseIP(url))
    }

    return domains
  } catch (error) {
    console.error(error)
  }
}

function sliceDomains(domains, min, max) {
  console.log('slicing domains...')
  let slicedDomains = []
  for(let domain of domains)
    slicedDomains.push(domain.slice(min, max))

  return slicedDomains
}

async function checkDomain(domainGroups) {
  console.log('checking domain information...')
  let filteredDomains = []
  for(let domainGroup of domainGroups) {
    for(let domain of domainGroup) {
      try {
        const headers = await getHttpHeaders(domain)

        for(let header of headers) {
          if(header.match(/HTTP.*200|HTTP.*301/)) filteredDomains.push(domain)
        }

      } catch (error) {
        console.error(error)
      }
    }
  }
  return filteredDomains
}

async function filterDomains(domainGroups) {
  console.log('getting domain information...')
  let filteredDomains = []
  for(let domainGroup of domainGroups) {
    for(let domain of domainGroup) {
      try {
        const headers = await getWhoIs(domain)

        for(let header of headers) {
          if(header.match(/Creation/)) filteredDomains.push({
            url: domain,
            date: header.split('Date:')[1].trim()
          })
        }

      } catch (error) {
        console.error(error)
      }
    }
  }
  return filteredDomains
}

async function main(urls, min, max) {
  try {
    const domains = await getDomains(urls)
    const slicedDomains = sliceDomains(domains, min, max)
    // const checkedDomains = await checkDomain(slicedDomains)
    // console.log(checkedDomains)

    const filteredDomains = await filterDomains(slicedDomains)

    console.log(filteredDomains)
  } catch (error) {
    console.error(error)
  }
}
main([process.argv[2]], process.argv[3], process.argv[4])
