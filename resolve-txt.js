const dns = require('dns');

dns.setServers(['8.8.8.8']); // Force Google DNS

dns.resolveTxt('cluster0.k3m2kom.mongodb.net', (err, addresses) => {
  const fs = require('fs');
  if (err) {
    fs.writeFileSync('dns-txt.txt', `ERROR: ${err.message}`);
  } else {
    fs.writeFileSync('dns-txt.txt', `SUCCESS: ${JSON.stringify(addresses)}`);
  }
});
