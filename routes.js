'use strict';

const Boom = require('boom');

const search = require('./search.js');
const borrowers = require('./borrowers.js');
const fines = require('./fines.js');

module.exports = [
	{
		method: 'GET',
	    path: '/search',
	    handler: function (request, reply) {

			var isbn = (request.query.isbn) ? request.query.isbn : null;
		    var title = (request.query.title) ? request.query.title : null;
		    var author = (request.query.author) ? request.query.author : null;

		    search.search(isbn, title, author, (err, res) => {
		    	if (err) {
		    		return reply(Boom.badRequest(err));
		        } else if (res && res.length) {
		            return reply(res);
		        } else {
		            return reply([]);
		        }
		    })
		}
	},
	{
		method: 'POST',
		path: '/borrowers',
		handler: function (request, reply) {

			var body = request.payload;

		    borrowers.add(body, (err, res) => {
		        if (err && err.code === 'ER_DUP_ENTRY') {
		            return reply(Boom.badRequest('SSN already exists'));
		        } else if (res) {
		            return reply(res);
		        } else {
		            return reply([]);
		        }
		    })
		}
	},
	{
		method: 'POST',
		path: '/borrowers/checkout',
		handler: function(request, reply) {
		    var body = request.payload;

		    borrowers.checkout(body, (err, res) => {
		        if (err) {
		            return reply(Boom.badRequest(res));
		        } else if (res) {
		            return reply(res);
		        } else {
		            return reply([]);
		        }
		    })
		}
	},
	{
		method: 'POST',
		path: '/borrowers/checkin',
		handler: function(request, reply) {
		    var body = request.payload;

		    borrowers.checkin(body, (err, res) => {
		        if (err) {
		            return reply(Boom.badRequest(res));
		        } else if (res) {
		            return reply(res);
		        } else {
		            return reply([]);
		        }
		    })
		}
	},
	{
		method: 'POST',
		path: '/fines',
		handler: function (request, reply) {

		    fines.add((err, res) => {
		        if (err) {
		            return reply(Boom.badRequest(res));
		        } else if (res) {
		            return reply(res);
		        } else {
		            return reply([]);
		        }
		    })
		}
	},
	{
		method: 'GET',
		path: '/fines/{cardno}',
		handler: function (request, reply) {
			var cardno = parseInt(request.params.cardno, 10);

			fines.get(cardno, (err, res) => {
				if (err) {
		            return reply(Boom.badRequest(res));
		        } else if (res) {
		            return reply(res);
		        } else {
		            return reply([]);
		        }
			})
		}
	},
	{
		method: 'PUT',
		path: '/fines/{cardno}',
		handler: function(request, reply) {
			var cardno = parseInt(request.params.cardno, 10);

			fines.update(cardno, (err, res) => {
				if (err) {
		            return reply(Boom.badRequest(res));
		        } else if (res) {
		            return reply(res);
		        } else {
		            return reply([]);
		        }
			})
		}
	}
]
