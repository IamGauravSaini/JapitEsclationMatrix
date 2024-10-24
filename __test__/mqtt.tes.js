// This is a sample test case file added by Smart24x7 Developers.
// Please Do not delete this file

let client;
//const { beforeAll, test } = require('jest');
jest.setTimeout(10000);
beforeAll(() => {
  // Connect to the MQTT broker
  client = require('../Configurations/mqtt');
}, 10000);

afterAll(() => {
  // Disconnect from the MQTT broker
  if (client) {
    client.end();
  }
});

it('should receive a message when publishing to a topic', (done) => {
  // Subscribe to the topic
  client.subscribe('test', (err) => {
    if (err) {
      done(err);
    }

    // Publish a message to the topic
    client.publish(
      'ER/IN/V1/E/RESTAPI/API/AIRBNB/Request/7/7/7/EMS/SYS/191245/LISTONE',
      '{}',
    );

    // Wait for the message to arrive
    client.on('message', (topic, message) => {
      // console.log(message)
      expect(topic).toBe(
        'ER/IN/V1/E/RESTAPI/API/AIRBNB/Request/7/7/7/EMS/SYS/191245/LISTONE',
      );
      expect(message.toString()).toBe('{}');
      done();
    });
  });
});
