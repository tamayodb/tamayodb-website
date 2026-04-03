const dns = require('dns').promises;

async function test() {
  try {
    const records = await dns.resolveSrv('_mongodb._tcp.tamayodb.jtjp3xl.mongodb.net');
    console.log('SRV records found:', records);
  } catch (err) {
    console.error('DNS lookup failed:', err.message);
    console.log('Try using the standard connection string instead of SRV:');
  }
}
test();