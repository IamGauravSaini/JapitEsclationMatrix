const { MongoClient } = require('mongodb');
const { MONGO_URI, MONGO_DB } = require('../Configurations/readconfigparams');

describe('insert', () => {
  // console.log(MONGO_URI);
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("monogodb://192.168.2.64:27017/smartsubscription/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    jest.useFakeTimers();
    db = await connection.db(MONGO_DB);
  },10000);

  afterAll(async () => {
    await connection.close();
  },10000);

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  },10000);

  it('should delete a doc into collection', async () => {
    const users = db.collection('users');
    const insertedUser = await users.deleteOne({ _id: 'some-user-id' });
    expect(insertedUser.result.ok).toEqual(1);
  },10000);
});
