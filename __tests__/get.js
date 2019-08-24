'use strict'
const assert=require('assert');
const obj_init= require('../db/db.js')();
const db = obj_init.db;
const connection = obj_init.connection;

afterAll(() => {
	async () => {
		await new Promise(resolve => setTimeout(() => resolve(), 5000)); // avoid jest open handle error
		connection.end(function(err,data){ if(err)
				return err;

			return data;})
	}

});

describe('get all series', () => {
	test('fetch series using join', () => {
		db.fetchSeriesNoJoins(function(err,data){
			expect(err).toEqual(null);
			expect(data.length).toEqual(30);

		});
	});
	test('fetch series without using join', () => {
		db.fetchSeriesWithJoins(function(err,data1){
			expect(data1.length).toEqual(30);
		});

	});

});

describe('get episodes of user', () => {
	test('return episodes for userId X', () => {
		const data_userId = {"userId": 3};
		db.fetchUserWatchHistory(data_userId, function(err,data){
			expect(err).toEqual(null);
			expect(data.length).toEqual(3);
		});
	});


	test('validate episode rating to be 1-5', () => {
		const data_rate = {"userId":1,"episodeId":2,"rating":11}
		db.addUserWatchData(data_rate , function(err,data){
			expect(err).not.toBeNull();
			expect(err.toString()).toMatch(/CONSTRAINT/);
		});
	});

});



