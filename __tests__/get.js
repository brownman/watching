assert=require('assert');
const obj_init= require('../db/db.js')();
const db = obj_init.db;
var connection = obj_init.connection;

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
			expect(data[0].length).toEqual(30);
		
		});
	});
	test('fetch series without using join', () => {
		db.fetchSeriesWithJoins(function(err,data1){
				//expect(err).toEqual(null);
//			console.log(arguments)
				expect(data1.length).toEqual(30);
				///expect([data1[0]).toDeepEqual(data[0]);
			});

	});

});

