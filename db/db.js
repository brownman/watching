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
	const query = 'call getAllEpisodes();'; //SELECT * FROM series';
	executeQueryWithPromise(query)
		  .then(function(data){
	return callback(null,data);
		  }).catch(function(err){
	return callback(err);
		  })
  };

  db.fetchSeriesWithJoins = function(callback) {
	  const query = 'SELECT series.name as "serie name", b.seasonNumber as "season num", c.episodeNumber as "episode num" FROM series JOIN seasons b ON series.id=b.seriesID JOIN episodes c ON c.seasonID=b.id GROUP BY series.name,2,3'; //, b.seasonNumber, c.episodeNumber ;';
	executeQueryWithPromise(query)
		  .then(function(data){
	return callback(null,data);
		  }).catch(function(err){
	return callback(err);
		  })
  };
  
  db.addUserWatchData = function(data, callback) {
    // Add code here
	const sql='insert into users_episodes (userID,episodeID, rating) VALUES(?,?,?)'
 	const inserts = [data.userId,data.episodeId,data.rating];
 	query = mysql.format(sql, inserts);
	executeQueryWithPromise(query)
		  .then(function(data){
	return callback(null,data);
		  }).catch(function(err){
	return callback(err);
		  })
  };

  db.fetchUserWatchHistory = function(data, callback) {
    // Add code here
	  //
	 if (! data.hasOwnProperty('userId')){
	 return callback('The object does not contain userId');
	 }

	 const userId = data.userId;
	 const sql = 'call getUserEpisodes(?)';
	 const inserts = [userId];
 	 query = mysql.format(sql, inserts);
	 executeQueryWithPromise(query)
		  .then(function(data){
	 return callback(null,data);
		  }).catch(function(err){
	 return callback(err);
		  })

	 
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

