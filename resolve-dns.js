const dns = require('dns');

dns.setServers(['8.8.8.8']); // Force Google DNS to bypass ISP block

dns.resolveSrv('_mongodb._tcp.cluster0.k3m2kom.mongodb.net', (err, addresses) => {
  const fs = require('fs');
  if (err) {
    fs.writeFileSync('dns-result.txt', `ERROR: ${err.message}`);
  } else {
    fs.writeFileSync('dns-result.txt', `SUCCESS: ${JSON.stringify(addresses)}`);
  }
});
