//App should start here!
const obj_main = require('./db/db.js')();
const db = obj_main.db;
const connection = obj_main.connection;
//console.log(connection)
db.fetchSeriesNoJoins(function(err,data){
if(err)
	return console.log(err);
console.log(data);
});

connection.end(function(err,data){ if(err)
return err;return data;})
