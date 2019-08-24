//Server should be implemented here
//
const obj_main = require('../db/db.js')();
const db = obj_main.db;
const connection = obj_main.connection;

const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => { 
	res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/fetchSeriesWithJoins', (req, res) => { 
	db.fetchSeriesWithJoins(function(err,data){
		if(err)
			return res.send(err);
		res.json(data);	
	});
});
app.get('/fetchSeriesNoJoins', (req, res) => { 
	db.fetchSeriesNoJoins(function(err,data){
		if(err)
			return res.send(err);
		res.json(data);	
	});
});
app.get('/fetchUserWatchHistory', (req, res) => { 
	res.sendFile(path.join(__dirname + '/../public/fetchUserWatchHistory.html'));
});
app.get('/fetchUserWatchHistoryAction', (req, res) => { 
	if (!req.query.hasOwnProperty("userId") || ! parseInt(req.query.userId))
		return res.send('userId should be integer');
	const userId = req.query.userId;
	const data_userId={"userId": userId}
	db.fetchUserWatchHistory(data_userId, function(err,data){
		if(err)
			return res.send(err);
		res.json(data);	
	});
});

app.get('/fetchUserWatchHistoryAction', (req, res) => { 
	if (!req.query.hasOwnProperty("userId") || ! parseInt(req.query.userId))
		return res.send('userId should be integer');
	const userId = req.query.userId;
	const data_userId={"userId": userId}
	db.fetchUserWatchHistory(data_userId, function(err,data){
		if(err)
			return res.send(err);
		res.json(data);	
	});
});

app.get('/addUserWatchData', (req, res) => { 
	res.sendFile(path.join(__dirname + '/../public/addUserWatchData.html'));
});

app.get('/addUserWatchDataAction', (req, res) => { 
	if ((!req.query.hasOwnProperty("userId") || ! parseInt(req.query.userId)) ||
		(!req.query.hasOwnProperty("episodeId") || ! parseInt(req.query.episodeId)) ||
		(!req.query.hasOwnProperty("rating") || ! parseInt(req.query.rating)))
	{ return res.send('userId should be integer'); }

	const userId = req.query.userId;
	const episodeId= req.query.episodeId;
	const rating= req.query.rating;

	const data_user={"userId": userId, "episodeId": episodeId, "rating":rating}
	db.addUserWatchData(data_user, function(err,data){
		if(err)
			return res.send(err);
		res.json(data);	
	});
});





app.listen(3000, () => console.log('listening on port 3000'));

