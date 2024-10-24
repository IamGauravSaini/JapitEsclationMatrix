const pool = require('../backend/config/mysql');
const { MYSQL_DB } = require('../Configurations/readconfigparams');
const { promisify } = require('util');

describe('MySQL Database Test', () => {
  let query;
  beforeAll(() => {
    // Connect to the MQTT broker
    query = promisify(pool.query).bind(pool);
  });
  test('Fetch data from database', async () => {
    const data = await query(
      `SELECT * FROM clientmaster WHERE ECode="SRPL0303"`,
    );
    expect(data.length).toBeGreaterThan(0);
  });

  afterAll(() => {
    // Disconnect from the MQTT broker
    if (pool) {
      pool.end();
    }
  });
});
