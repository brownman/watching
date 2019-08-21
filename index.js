//App should start here!
db = require('./db/db.js')();
db.fetchSeriesNoJoins();


//.then(function(){console.log(arguments)}).catch(function(){console.log(arguments)});
