const express = require('express');
const router = express.Router();
const models = require('../models/');
const attributes = require('../models/attributes/e_synchro_credentials');
const options = require('../models/options/e_synchro_credentials');
const model_builder = require('../utils/model_builder');
const entity_helper = require('../utils/entity_helper');

//
// FIND ALL
//
router.get('/', function(req, res) {
	const answer = {
		limit: parseInt(req.query.limit || 50),
		offset: parseInt(req.query.offset || 0),
		error: null
	};

	// Build include from query parameter: `?include=r_asso1,r_asso2`
	const include = [];
	if (req.query.include) {
		const queryIncludes = req.query.include.split(',');
		for (let i = 0; i < queryIncludes.length; i++)
			for (let j = 0; j < options.length; j++)
				if (queryIncludes[i] == options[j].as)
					include.push({
						model: models[entity_helper.capitalizeFirstLetter(options[j].target)],
						as: options[j].as
					});
	}
	const query = {limit: answer.limit, offset: answer.offset};
	if (include.length)
		query.include = include;

	const where = {};
	for (const field in req.query)
		if (field.indexOf('fk_id_') == 0 || field.indexOf('f_') == 0 && attributes[field])
			where[field] = req.query[field];
	if (Object.keys(where).length)
		query.where = where;

	models.E_synchro_credentials.findAndCountAll(query).then(function(e_synchro_credentialss) {
		answer["e_synchro_credentialss".substring(2)] = e_synchro_credentialss.rows || [];
		answer.totalCount = e_synchro_credentialss.count;
		answer.rowsCount = answer["e_synchro_credentialss".substring(2)].length;

		res.status(200).json(answer);
	}).catch(function(err) {
		answer.error = err;
		res.status(500).json(answer);
	});
});

//
// FIND ONE
//
router.get('/:id', function(req, res) {
	const answer = {
		error: null
	};
	const id_e_synchro_credentials = parseInt(req.params.id);

	// Build include from query parameter: `?include=r_asso1,r_asso2`
	const include = [];
	if (req.query.include) {
		const queryIncludes = req.query.include.split(',');
		for (let i = 0; i < queryIncludes.length; i++)
			for (let j = 0; j < options.length; j++)
				if (queryIncludes[i] == options[j].as)
					include.push({
						model: models[entity_helper.capitalizeFirstLetter(options[j].target)],
						as: options[j].as
					});
	}
	const query = {limit: answer.limit, offset: answer.offset, };
	if (include.length)
		query.include = include;

	const where = {id: id_e_synchro_credentials};
	for (const field in req.query)
		if (field.indexOf('fk_id_') == 0 || field.indexOf('f_') == 0 && attributes[field])
			where[field] = req.query[field];
	query.where = where;

	models.E_synchro_credentials.findOne(query).then(function(e_synchro_credentials) {
		if (!e_synchro_credentials) {
			answer.error = "No e_synchro_credentials with ID "+id_e_synchro_credentials;
			return res.status(404).json(answer);
		}
		answer["e_synchro_credentials".substring(2)] = e_synchro_credentials;

		res.status(200).json(answer);
	}).catch(function(err){
		answer.error = err;
		res.status(500).json(answer);
	});
});

//
// FIND ASSOCIATION
//
router.get('/:id/:association', function(req, res) {
	const answer = {
		error: null,
		limit: parseInt(req.query.limit || 50),
		offset: parseInt(req.query.offset || 0)
	};
	const id_e_synchro_credentials = req.params.id;
	const association = req.params.association;

	let include = null;
	for (let i = 0; i < options.length; i++) {
		if (options[i].as == 'r_' + association) {
			if (options[i].relation.toLowerCase().indexOf('many') != -1) {
				include = {
					model: models[entity_helper.capitalizeFirstLetter(options[i].target)],
					as: options[i].as
				};
				delete answer.limit;
				delete answer.offset;
			}
			else
				include = {
					model: models[entity_helper.capitalizeFirstLetter(options[i].target)],
					as: options[i].as,
					limit: answer.limit,
					offset: answer.offset
				}
			break;
		}
	}

	if (include == null) {
		answer.error = "No association with "+association;
		return res.status(404).json(answer);
	}

	const where = {};
	for (const field in req.query)
		if (field.indexOf('f_') == 0)
			where[field] = req.query[field];
	if (Object.keys(where).length)
		include.where = where;

	models.E_synchro_credentials.findOne({
		where: {id: id_e_synchro_credentials},
		include: include
	}).then(function(e_synchro_credentials) {
		if (!e_synchro_credentials) {
			answer.error = "No e_synchro_credentials with ID "+id_e_synchro_credentials;
			return res.status(404).json(answer);
		}
		answer[association] = e_synchro_credentials[include.as];

		res.status(200).json(answer);
	}).catch(function(err){
		answer.error = err;
		res.status(500).json(answer);
	});
});

//
// CREATE
//
router.post('/', function(req, res) {
	const answer = {
		error: null
	};

	const createObject = model_builder.buildForRoute(attributes, options, req.body);

	models.E_synchro_credentials.create(createObject, {user: req.user}).then(function(e_synchro_credentials) {
		answer["e_synchro_credentials".substring(2)] = e_synchro_credentials;

		// Set associations
		const associationPromises = [];
		for (const prop in req.body)
			if (prop.indexOf('r_') == 0) {
				if (e_synchro_credentials['set'+entity_helper.capitalizeFirstLetter(prop)] !== 'undefined')
					associationPromises.push(e_synchro_credentials['set'+entity_helper.capitalizeFirstLetter(prop)](req.body[prop]));
				else
					console.error("API: Couldn't set association.\nAPI: e_synchro_credentials.set"+entity_helper.capitalizeFirstLetter(prop)+"() is undefined.");
			}

		Promise.all(associationPromises).then(function() {
			res.status(200).json(answer);
		}).catch(function(err) {
			console.error(err);
			answer.error = "Error with associations";
			res.status(500).json(answer);
		});
	}).catch(function(err){
		console.error(err);
		answer.error = err;
		res.status(500).json(answer);
	});
});

//
// UPDATE
//
router.put('/:id', function(req, res) {
	const answer = {
		error: null
	};
	const id_e_synchro_credentials = parseInt(req.params.id);
	const updateObject = model_builder.buildForRoute(attributes, options, req.body);

	// Fetch e_synchro_credentials to update
	models.E_synchro_credentials.findOne({where: {id: id_e_synchro_credentials}}).then(function(e_synchro_credentials) {
		if (!e_synchro_credentials) {
			answer.error = "No e_synchro_credentials with ID "+id_e_synchro_credentials;
			return res.status(404).json(answer);
		}

		// Update e_synchro_credentials
		e_synchro_credentials.update(updateObject, {where: {id: id_e_synchro_credentials}}, {user: req.user}).then(function() {
			answer["e_synchro_credentials".substring(2)] = e_synchro_credentials;

			// Set associations
			const associationPromises = [];
			for (const prop in req.body)
				if (prop.indexOf('r_') == 0) {
					if (e_synchro_credentials['set'+entity_helper.capitalizeFirstLetter(prop)] !== 'undefined')
						associationPromises.push(e_synchro_credentials['set'+entity_helper.capitalizeFirstLetter(prop)](req.body[prop]));
					else
						console.error("API: Couldn't set association.\nAPI: e_synchro_credentials.set"+entity_helper.capitalizeFirstLetter(prop)+"() is undefined.");
				}

			Promise.all(associationPromises).then(function() {
				res.status(200).json(answer);
			}).catch(function(err) {
				console.error(err);
				answer.error = "Error with associations";
				res.status(500).json(answer);
			});
		}).catch(function(err){
			answer.error = err;
			res.status(500).json(answer);
		});
	}).catch(function(err){
		answer.error = err;
		res.status(500).json(answer);
	});
});

//
// DELETE
//
router.delete('/:id', function(req, res) {
	const answer = {
		error: null
	}
	const id_e_synchro_credentials = req.params.id;

	models.E_synchro_credentials.destroy({where: {id: id_e_synchro_credentials}}).then(function() {
		res.status(200).end();
	}).catch(function(err){
		answer.error = err;
		res.status(500).json(answer);
	});
});

module.exports = router;
