const mysql = require('mysql');
module.exports = function() {

const connection = mysql.createConnection({
  host: process.env.DB_HOST_DOCKER,
  port: process.env.DB_PORT_DOCKER,
  user: process.env.DB_USER_DOCKER,
  password: process.env.DB_PASSWORD_DOCKER,
  database: process.env.DB_DATABASE_DOCKER,
  //connectionLimit: 1,
  //debug: false 
});
  
  connection.connect(function(err) {
    if (err) {
      //Handle this error
	   //console.log(err);
      return err;
    }
  });

  //Wrapper method to execute queries with callbacks
  const executeQueryWithCallback = function(query, callback) {
    connection.query(query, callback);
  };
  
  //Wrapper method to execute queries with promises
  const executeQueryWithPromise = function(query) {
    return new Promise(function(resolve, reject) {
      connection.query(query, function(err, results, fields) {
        if (err)
          return reject(err);
        resolve(results);
      });
    });
  };

  const db = {};

  db.fetchSeriesNoJoins = function(callback) {
    // Add code here
//	const query = 'call getAllEpisodes();';//SELECT * FROM series';
	  const query = 'SELECT series.name, b.seasonNumber, b.airDate as "season airDate", c.episodeNumber, c.airDate as "episode airDate" FROM series JOIN seasons b ON series.id=b.seriesID JOIN episodes c ON c.seasonID=b.id WHERE 1';

	executeQueryWithPromise(query)
		  .then(function(data){
	return callback(null,data);
		  }).catch(function(err){
	return callback(err);
		  })
  };

  db.fetchSeriesWithJoins = function(callback) {
    // Add code here
  };
  
  db.addUserWatchData = function(data, callback) {
    // Add code here
  };

  db.fetchUserWatchHistory = function(data, callback) {
    // Add code here
  };

  return {
	  db: db,
	  connection: connection
  }
};

/*
const pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    port: 3306,
    user     : 'root',
    password : '',
    database : 'address_book',
    debug    :  true
});
//pool.getConnection(function(err) {
*/

