'use strict'

const mysql = require('mysql');
module.exports = function() {

const connection = mysql.createConnection({
  host: process.env.DB_HOST_DOCKER,
  port: process.env.DB_PORT_DOCKER,
  user: process.env.DB_USER_DOCKER,
  password: process.env.DB_PASSWORD_DOCKER,
  database: process.env.DB_DATABASE_DOCKER,
  debug: process.env == 'dev' ? true : false 
  //connectionLimit: 1,
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
	return callback(null,data[0]);
		  }).catch(function(err){
	return callback(err);
		  })
  };

  db.fetchSeriesWithJoins = function(callback) {
	  const query = 'SELECT series.name as "serie name",series.id as "serie id",series.director as "serie director",  series.genre as "serie genre", series.year as "serie year", b.id as "season id",b.seasonNumber as "season number", b.airDate as "season airdate", c.episodeNumber as "episode number", c.airDate as "episode airdate", c.id as "episode id" FROM series JOIN seasons b ON series.id=b.seriesID JOIN episodes c ON c.seasonID=b.id ORDER BY series.name, b.seasonNumber, c.episodeNumber ;';
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
 	const query = mysql.format(sql, inserts);
	executeQueryWithPromise(query)
		  .then(function(data){
	return callback(null,data);
		  }).catch(function(err){
	return callback(err);
		  })
  };

  db.fetchUserWatchHistory = function(data, callback) {
    // Add code here
	 if (! data.hasOwnProperty('userId')){
	 return callback('The object does not contain userId');
	 }
	 const userId = data.userId;
	 const sql = 'call getUserEpisodes(?)';
	 const inserts = [userId];
 	 const query = mysql.format(sql, inserts);
	 executeQueryWithPromise(query)
		  .then(function(data){
	 return callback(null,data[0]);
		  }).catch(function(err){
	 return callback(err);
		  })
  };

  return {
	  db: db,
	  connection: connection //expose it for the use of the testing suite
  }
};

