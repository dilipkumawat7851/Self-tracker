require('dotenv').config();
const https = require('https');
const options = {
  hostname: 'api.openai.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'User-Agent': 'Node.js Check'
  }
};
const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'DATA:', data));
});
req.on('error', (e) => console.log('ERROR:', e.message));
req.write(JSON.stringify({ model: 'gpt-4o-mini', messages: [{role: 'user', content: 'hello'}] }));
req.end();
