'use strict'
//Server should be implemented here
//express server serves the api defined on db/db.js
const obj_main = require('../db/db.js')();
const db = obj_main.db;

const express = require('express');
const app = express();
const path = require('path');

function groupBy(data){
	var groupBy = key=>array=>array.reduce((objectsByKeyValue,obj)=>{
		const value = obj[key];
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
		return objectsByKeyValue;
	}
		, {});

	var groupByBrand = groupBy('serie name');
	var series = groupByBrand(data)
	console.log(series)

	Object.keys(series).forEach(function(key) {
		//iterate series
		var serie = series[key];
		var groupBySeason = groupBy('season number');
		serie = {
			"serie director": serie[0]["serie director"],
			"serie genre": serie[0]["serie genre"],
			"serie year": serie[0]["serie year"],
			"serie id": serie[0]["serie id"],
			"seasons": groupBySeason(serie)
		}
		var seasons = serie["seasons"];
		Object.keys(seasons).forEach(function(key2) {
			//iterate seasons
			var season = seasons[key2];
			///////////////////
			var groupByEpisode = groupBy('episode number');
			season = {
				"season airdate": season[0]["season airdate"],
				"season seasonNumber": season[0]["season seasonNumber"],
				"season id": season[0]["season id"],
				"episodes": groupByEpisode(season)
			}
			var episodes = season["episodes"];
			Object.keys(episodes).forEach(function(key3) {
				episodes[key3] = {
					"episode airdate": episodes[key3][0]["episode airdate"],
					"episode id": episodes[key3][0]["episode id"]
				}
				season["episodes"] = episodes;
			})
			seasons[key2] = season;

		})
		series[key] = serie;
	});

//	console.log(series)
	return series;
}

app.get('/', (req, res) => { 
	res.sendFile(path.join(__dirname + '/../public/index.html')); //main view
});

app.get('/fetchSeriesWithJoins', (req, res) => { 
	db.fetchSeriesWithJoins(function(err,data){
		if(err)
			return res.json({"error":err});
		res.json(groupBy(data));	
	});
});

app.get('/fetchSeriesNoJoins', (req, res) => { 
	db.fetchSeriesNoJoins(function(err,data){
		if(err)
			return res.json({"error":err});
		res.json(groupBy(data));	
	});
});

app.get('/fetchUserWatchHistory', (req, res) => { 
	res.sendFile(path.join(__dirname + '/../public/fetchUserWatchHistory.html')); //child view
});

app.get('/fetchUserWatchHistoryAction', (req, res) => { 
	if (!req.query.hasOwnProperty("userId") || ! parseInt(req.query.userId)) //input validation: userId must be an integer
		return res.send('userId should be integer');
	const userId = req.query.userId;
	const data_userId={"userId": userId}
	db.fetchUserWatchHistory(data_userId, function(err,data){
		if(err)
			return res.json({"error": err});
		res.json({"userId":userId, "series":groupBy(data)});	
	});
});

app.get('/addUserWatchData', (req, res) => { 
	res.sendFile(path.join(__dirname + '/../public/addUserWatchData.html'));
});

app.get('/addUserWatchDataAction', (req, res) => { 
	if ((!req.query.hasOwnProperty("userId") || ! parseInt(req.query.userId)) ||
		(!req.query.hasOwnProperty("episodeId") || ! parseInt(req.query.episodeId)) ||
		(!req.query.hasOwnProperty("rating") || ! parseInt(req.query.rating)))
	{ return res.send('userId, episodeId, rating -  should be integers'); }

	const userId = req.query.userId;
	const episodeId= req.query.episodeId;
	const rating= req.query.rating;

	const data_user={"userId": userId, "episodeId": episodeId, "rating":rating}
	db.addUserWatchData(data_user, function(err,data){
		if(err)
			return res.json({"error": err});
		res.json({"success": data});	
	});
});





app.listen(3000, () => console.log('listening on port 3000'));

