const redis = require('redis');
const { REDIS } = require('../Configurations/readconfigparams');

test('Redis connection test', (done) => {
  // console.log(REDIS);
  const client = redis.createClient({ url: REDIS }); // Create a new Redis client

  // Check the connection event
  client.on('connect', () => {
    expect(client.connected).toBe(true); // Verify that the client is connected
    client.quit(); // Close the connection
  });

  // Check the error event
  client.on('error', (error) => {
    done(error); // Fail the test if there is an error
  });

  // Check the end event
  client.on('end', () => {
    done(); // Finish the test when the connection is closed
  });
  done();
});
