const express = require('express');
const router = express.Router();
const models = require('../models/');
const attributes = require('../models/attributes/e_inline_help');
const options = require('../models/options/e_inline_help');
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

	models.E_inline_help.findAndCountAll(query).then(function(e_inline_helps) {
		answer["e_inline_helps".substring(2)] = e_inline_helps.rows || [];
		answer.totalCount = e_inline_helps.count;
		answer.rowsCount = answer["e_inline_helps".substring(2)].length;

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
	const id_e_inline_help = parseInt(req.params.id);

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

	const where = {id: id_e_inline_help};
	for (const field in req.query)
		if (field.indexOf('fk_id_') == 0 || field.indexOf('f_') == 0 && attributes[field])
			where[field] = req.query[field];
	query.where = where;

	models.E_inline_help.findOne(query).then(function(e_inline_help) {
		if (!e_inline_help) {
			answer.error = "No e_inline_help with ID "+id_e_inline_help;
			return res.status(404).json(answer);
		}
		answer["e_inline_help".substring(2)] = e_inline_help;

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
	const id_e_inline_help = req.params.id;
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

	models.E_inline_help.findOne({
		where: {id: id_e_inline_help},
		include: include
	}).then(function(e_inline_help) {
		if (!e_inline_help) {
			answer.error = "No e_inline_help with ID "+id_e_inline_help;
			return res.status(404).json(answer);
		}
		answer[association] = e_inline_help[include.as];

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

	models.E_inline_help.create(createObject, {user: req.user}).then(function(e_inline_help) {
		answer["e_inline_help".substring(2)] = e_inline_help;

		// Set associations
		const associationPromises = [];
		for (const prop in req.body)
			if (prop.indexOf('r_') == 0) {
				if (e_inline_help['set'+entity_helper.capitalizeFirstLetter(prop)] !== 'undefined')
					associationPromises.push(e_inline_help['set'+entity_helper.capitalizeFirstLetter(prop)](req.body[prop]));
				else
					console.error("API: Couldn't set association.\nAPI: e_inline_help.set"+entity_helper.capitalizeFirstLetter(prop)+"() is undefined.");
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
	const id_e_inline_help = parseInt(req.params.id);
	const updateObject = model_builder.buildForRoute(attributes, options, req.body);

	// Fetch e_inline_help to update
	models.E_inline_help.findOne({where: {id: id_e_inline_help}}).then(function(e_inline_help) {
		if (!e_inline_help) {
			answer.error = "No e_inline_help with ID "+id_e_inline_help;
			return res.status(404).json(answer);
		}

		// Update e_inline_help
		e_inline_help.update(updateObject, {where: {id: id_e_inline_help}}, {user: req.user}).then(function() {
			answer["e_inline_help".substring(2)] = e_inline_help;

			// Set associations
			const associationPromises = [];
			for (const prop in req.body)
				if (prop.indexOf('r_') == 0) {
					if (e_inline_help['set'+entity_helper.capitalizeFirstLetter(prop)] !== 'undefined')
						associationPromises.push(e_inline_help['set'+entity_helper.capitalizeFirstLetter(prop)](req.body[prop]));
					else
						console.error("API: Couldn't set association.\nAPI: e_inline_help.set"+entity_helper.capitalizeFirstLetter(prop)+"() is undefined.");
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
	const id_e_inline_help = req.params.id;

	models.E_inline_help.destroy({where: {id: id_e_inline_help}}).then(function() {
		res.status(200).end();
	}).catch(function(err){
		answer.error = err;
		res.status(500).json(answer);
	});
});

module.exports = router;
