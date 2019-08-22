assert=require('assert');
const obj_init= require('../db/db.js')();
const db = obj_init.db;
var connection = obj_init.connection;

afterAll(() => {
	connection.end(function(err,data){ if(err)
			return err;

		async () => {
			await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
		}

		return data;})
});

describe('get all series', () => {
	test('there should be 3 initially', () => {
		db.fetchSeriesNoJoins(function(err,data){
			expect(err).toEqual(null);
			expect(data.length).toEqual(3);
		});
	});
});
