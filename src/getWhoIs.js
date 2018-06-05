const http = require("https")

module.exports = (ip) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      hostname: "api.hackertarget.com",
      port: null,
      path: `/whois/?q=${ip}`,
      headers: { "cache-control": "no-cache", }
    };

    const req = http.request(options, (res) => {
      const chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk)
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks)
        const bodyString = body.toString()
        const bodyArray = bodyString.split('\n')

        resolve(bodyArray)
      });
    });

    req.end()
  })
}
