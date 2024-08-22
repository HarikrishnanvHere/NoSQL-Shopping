const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://harikrishnan:neelimavarma1996@hariscluster.vm9w7.mongodb.net/shop?retryWrites=true&w=majority&appName=HarisCluster'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () =>{
  if(_db) {
    return  _db;
  }
  throw 'No Database Found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
