const router = require('express').Router();
const block_access = require('../utils/block_access');
const models = require('../models/');
const attributes = require('../models/attributes/e_user_guide');
const options = require('../models/options/e_user_guide');
const model_builder = require('../utils/model_builder');
const entity_helper = require('../utils/entity_helper');
const component_helper = require('../utils/component_helper');
const moment = require("moment");
const SELECT_PAGE_SIZE = 10;
const enums_radios = require('../utils/enum_radio.js');

router.get('/update_form', block_access.actionAccessMiddleware("user_guide", "update"), (req, res) => {
	let e_user_guide = null;
	(async () => {
		const id_e_user_guide = req.query.id;

		let data = {
			enum_radio: enums_radios.translated("e_user_guide", req.session.lang_user, options)
		};

		if (typeof req.query.associationFlag !== 'undefined') {
			data.associationFlag = req.query.associationFlag;
			data.associationSource = req.query.associationSource;
			data.associationForeignKey = req.query.associationForeignKey;
			data.associationAlias = req.query.associationAlias;
			data.associationUrl = req.query.associationUrl;
		}

		e_user_guide = await entity_helper.optimizedFindOne('E_user_guide', id_e_user_guide, options);
		if (!e_user_guide) {
			e_user_guide = await models.E_user_guide.create({
				id: 1
			});
		}

		e_user_guide.dataValues.enum_radio = data.enum_radio;
		data.e_user_guide = e_user_guide;
		// Update some data before show, e.g get picture binary
		await entity_helper.getPicturesBuffers(e_user_guide, "e_user_guide", false)
		// Get association data that needed to be load directly here (to do so set loadOnStart param to true in options).
		data = await entity_helper.getLoadOnStartData(req.query.ajax ? e_user_guide.dataValues : data, options)
		return data;
	})().then(data => {
		if (req.query.ajax) {
			e_user_guide.dataValues = data;
			res.render('e_user_guide/update_fields', e_user_guide.get({
				plain: true
			}));
		} else
			res.render('e_user_guide/update', data);
	}).catch(err => {
		entity_helper.error(err, req, res, "/", "e_user_guide");
	});
});

router.post('/update', block_access.actionAccessMiddleware("user_guide", "update"), (req, res) => {
	const id_e_user_guide = parseInt(req.body.id);
	const updateObject = model_builder.buildForRoute(attributes, options, req.body);

	models.E_user_guide.findOne({
		where: {
			id: id_e_user_guide
		}
	}).then(e_user_guide => {
		if (!e_user_guide)
			return res.render('common/error', {error: 404});

		component_helper.address.updateAddressIfComponentExists(e_user_guide, options, req.body);

		updateObject.version = e_user_guide.version;
		if(typeof e_user_guide.version === 'undefined' || !e_user_guide.version)
			updateObject.version = 0;
		updateObject.version++;

		e_user_guide.update(updateObject, {user: req.user}).then(_ => {
			// We have to find value in req.body that are linked to an hasMany or belongsToMany association
			// because those values are not updated for now
			model_builder.setAssocationManyValues(e_user_guide, req.body, updateObject, options).then(_ => {
				req.session.toastr = [{
					message: 'message.update.success',
					level: "success"
				}];
				res.redirect('/user_guide/update_form?id=' + id_e_user_guide);
			}).catch(err => {
				entity_helper.error(err, req, res, '/user_guide/update_form?id=' + id_e_user_guide, "e_user_guide");
			});
		}).catch(err => {
			entity_helper.error(err, req, res, '/user_guide/update_form?id=' + id_e_user_guide, "e_user_guide");
		});
	}).catch(err => {
		entity_helper.error(err, req, res, '/user_guide/update_form?id=' + id_e_user_guide, "e_user_guide");
	});
});

router.post('/search', block_access.actionAccessMiddleware('user_guide', 'read'), (req, res) => {
	const search = '%' + (req.body.search || '') + '%';
	const limit = SELECT_PAGE_SIZE;
	const offset = (req.body.page - 1) * limit;

	// ID is always needed
	if (req.body.searchField.indexOf("id") == -1)
		req.body.searchField.push('id');

	const query = {
		raw: true,
		attributes: req.body.searchField,
		where: {}
	};
	if (search != '%%') {
		if (req.body.searchField.length == 1)
			query.where[req.body.searchField[0]] = {[models.$like]: search};
		else {
			query.where[models.$or] = [];
			for (let i = 0; i < req.body.searchField.length; i++) {
				if (req.body.searchField[i] == "id")
					continue;
				const currentOrObj = {};
				if (req.body.searchField[i].indexOf(".") != -1)
					currentOrObj["$" + req.body.searchField[i] + "$"] = {[models.$like]: search}
				else
					currentOrObj[req.body.searchField[i]] = {[models.$like]: search}
				query.where[models.$or].push(currentOrObj);
			}
		}
	}

	// Example custom where in select HTML attributes, please respect " and ':
	// data-customwhere='{"myField": "myValue"}'

	// Notice that customwhere feature do not work with related to many field if the field is a foreignKey !

	// Possibility to add custom where in select2 ajax instanciation
	if (typeof req.body.customwhere !== "undefined") {
		// If customwhere from select HTML attribute, we need to parse to object
		if(typeof req.body.customwhere === "string")
			req.body.customwhere = JSON.parse(req.body.customwhere);
		for (const param in req.body.customwhere) {
			// If the custom where is on a foreign key
			if (param.indexOf("fk_") != -1)
				for (const option in options) {
					// We only add where condition on key that are standard hasMany relation, not belongsToMany association
					if ((options[option].foreignKey == param || options[option].otherKey == param) && options[option].relation != "belongsToMany"){
						// Where on include managment if fk
						if(param.indexOf(".") != -1)
							query.where["$"+param+"$"] = req.body.customwhere[param];
						else
							query.where[param] = req.body.customwhere[param];
					}
				}
			else if (param.indexOf(".") != -1)
				query.where["$"+param+"$"] = req.body.customwhere[param];
			else
				query.where[param] = req.body.customwhere[param];
		}
	}

	query.offset = offset;
	query.limit = limit;

	// If you need to show fields in the select that are in an other associate entity
	// You have to include those entity here
	// query.include = [{model: models.E_myentity, as: "r_myentity"}]

	models.E_user_guide.findAndCountAll(query).then(results => {
		results.more = results.count > req.body.page * SELECT_PAGE_SIZE;
		// Format value like date / datetime / enum / etc...
		for (const field in attributes)
			for (let i = 0; i < results.rows.length; i++)
				for (const fieldSelect in results.rows[i])
					if(fieldSelect == field && results.rows[i][field] && results.rows[i][field] != "")
						switch(attributes[field].newmipsType) {
							case "date":
								results.rows[i][field] = moment(results.rows[i][field]).format(req.session.lang_user == "fr-FR" ? "DD/MM/YYYY" : "YYYY-MM-DD")
								break;
							case "datetime":
								results.rows[i][field] = moment(results.rows[i][field]).format(req.session.lang_user == "fr-FR" ? "DD/MM/YYYY HH:mm" : "YYYY-MM-DD HH:mm")
								break;
							case "enum":
								results.rows[i][field] = enums_radios.translateFieldValue('e_user_guide', field, results.rows[i][field], req.session.lang_user)
								break;
							default:
								break;
						}

		res.json(results);
	}).catch(err => {
		console.error(err);
		res.status(500).json(err);
	});
});

module.exports = router;