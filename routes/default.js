const router = require('express').Router();
const block_access = require('../utils/block_access');
const globalConfig = require('../config/global');
const appConf = require('../config/application.json');
const multer = require('multer');
const fs = require('fs-extra');
const upload = multer().single('file');
const models = require('../models/');
const Jimp = require("jimp");
const enums_radios = require('../utils/enum_radio.js');
const pool_items = require('../config/pool_items');
const request = require('request');

// Set up auth Google Vision
// Imports the Google Cloud client library
const google_vision = require('@google-cloud/vision');

// Creates a client
const vision = new google_vision.ImageAnnotatorClient();

// Mavlink
const mavlink = require('../utils/mavlink.js');


/***** Mavlink *****/

/* Subscribe to event requested by server */
router.get('/events', block_access.isLoggedIn, function(req, res) {

	// console.log("/events");

	res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

	let url = 'http://127.0.0.1:8088/mavlink';
	let headers = {
		'Content-Type': 'application/json'
	};
    const refreshRate = 500; // in milliseconds
    return setInterval(() => {

        
      	request.get({headers: headers, url: url, form: {}}, function (e, r, body) {

		    const id = Date.now();
			const data = body;
			const message =
			'retry: ' + refreshRate + '\nid:' + id + '\ndata: ' + data + '\n\n';
			res.write(message);
		});

      
    }, refreshRate);
});

/* Arm vehicle */
router.post('/mavlink_arm', block_access.isLoggedIn, function(req, res) {

	return mavlink.arm();
});

/* Disarm vehicle */
router.post('/mavlink_disarm', block_access.isLoggedIn, function(req, res) {

	return mavlink.disarm();
	
});

/* Change mode */
router.post('/mavlink_mode', block_access.isLoggedIn, function(req, res) {
	console.log(req.body.mode);
	return mavlink.set_mode(req.body.mode);

});


/* WebRTC */

router.get('/broadcast', block_access.isLoggedIn, block_access.moduleAccessMiddleware("administration"), function(req, res) {
	res.render('default/broadcast');
});

router.post('/capture', (req, res) => {

	let f_index = req.body.f_index;
	let f_code = req.body.f_code;
	let f_image = req.body.f_image;
	
	function pad(num, size) {
	    var s = "00" + num;
	    return s.substr(s.length-size);
	}

	function decodeBase64Image(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};

		if (matches.length !== 3) {
		return new Error('Invalid input string');
		}

		response.type = matches[1];
		// response.data = new Buffer(matches[2], 'base64');
		response.data = Buffer.from(matches[2], 'base64');

		return response;
	}

	let imageBuffer = decodeBase64Image(f_image);
	let folderPath = globalConfig.localstorage + f_code;
	let folderBrandedPath = globalConfig.localstorage + f_code + '/branded';
	let filePath = folderPath + '/' + pad(f_index,3) + '.png';
	let fileBrandedPath = folderBrandedPath + '/' + pad(f_index,3) + '_branded.png';

	fs.mkdir(folderPath, {recursive:true}, (err) => {
		if (err) res.sendStatus(500);

		fs.mkdir(folderBrandedPath, {recursive:true}, (err) => {
			if (err) res.sendStatus(500);

			fs.writeFileSync(filePath, imageBuffer.data);


			// Add logo to capture
			let logoPath = __dirname + '/../public/img/watermark.png';
			Jimp.read(logoPath, (err, logoSrc) => {

				Jimp.read(filePath, (err, imageActive) => {
				  if (err) throw err;
				  imageActive
				    .composite(logoSrc, imageActive.bitmap.width - 130, imageActive.bitmap.height - 130) // incrust logo
				    .write(fileBrandedPath); // save
				});
			});


			// Analyze capture texts with Google vision
			if (appConf.google_vision) {
				const request = {
		                "image": {
		                    "content": imageBuffer.data
		                },
		                "features": [
		                    {
					          	"maxResults": 50,
					          	"type": "OBJECT_LOCALIZATION"
					        },
					        {
					        	"maxResults": 50,
		                        "type": "TEXT_DETECTION"
		                    }
		                ]
		        };

		        // ********** WARNING : Needs to load ".env" file for credentials ***************
		        // ********** See README.txt ***********
		        vision.annotateImage(request).then((result) => {

		        	console.log(result);

		        	let bFound = false;

					let keywords = [];
					let objects = [];

		        	let object = "";
		        	let text = "";

		            if (result[0].localizedObjectAnnotations) object = result[0].localizedObjectAnnotations.name;
		            if (result[0].fullTextAnnotation) text = result[0].fullTextAnnotation.text;

					for(let j=0;j<pool_items.length;j++) {

						objects = pool_items[j].objects;
						for(let i=0;i<keywords.length;i++) {

							if ((text.includes(keywords[i])) || (text.includes(keywords[i].toUpperCase()))) {
								bFound = true;
							}
						}

						keywords = pool_items[j].keywords;
						for(let i=0;i<keywords.length;i++) {

							if ((text.includes(keywords[i])) || (text.includes(keywords[i].toUpperCase()))) {
								bFound = true;
							}
						}
					}
		            /*let bFound = false;
		            let text = "";

		            if (result[0].fullTextAnnotation) text = result[0].fullTextAnnotation.text;

					for(let i=0;i<keywords.length;i++) {
						if ((text.includes(keywords[i])) || (text.includes(keywords[i].toUpperCase()))) {
							bFound = true;
						}
					}*/

					fs.appendFile(folderPath + '/recognition.txt', pad(f_index,3) + '.png' + " : " + bFound + "\n", function (err) {
					  	if (err) {
					  		return res.json({
								matching: false
							});
					  	}

						return res.json({
							matching: bFound
						});
					});



		        });
	       	}
	       	else {
	       		return res.json({
					matching: false
				});
	       	}
		});
	});
});


/* GET status page to check if workspace is ready. */
router.get('/status', (req, res) => {
	res.sendStatus(200);
});

router.post('/widgets', block_access.isLoggedIn, (req, res) => {
	const user = req.session.passport.user;
	const widgetsInfo = req.body.widgets;
	const widgetsPromises = [];
	const data = {};

	for (let i = 0; i < widgetsInfo.length; i++) {
		const currentWidget = widgetsInfo[i];
		const modelName = 'E_' + currentWidget.entity.substring(2);

		// Check group and role access to widget's entity
		if (!block_access.entityAccess(user.r_group, currentWidget.entity.substring(2)) || !block_access.actionAccess(user.r_role, currentWidget.entity.substring(2), 'read'))
			continue;

		widgetsPromises.push(((widget, model) => new Promise(resolve => {
			const widgetRes = {type: widget.type};
			switch (widget.type) {
				case 'info':
				case 'stats':
					models[model].count().then(widgetData => {
						widgetRes.data = widgetData;
						data[widget.widgetID] = widgetRes;
						resolve();
					}).catch(resolve);
					break;

				case 'piechart':
					if (!widget.field) {
						console.error('No field defined for widget piechart')
						return resolve();
					}
					// STATUS PIECHART
					if (widget.field.indexOf('s_') == 0) {
						const statusAlias = 'r_' + widget.field.substring(2);
						models[model].findAll({
							attributes: [statusAlias + '.f_name', statusAlias + '.f_color', [models.sequelize.fn('COUNT', 'id'), 'count']],
							group: [statusAlias + '.f_name', statusAlias + '.f_color', statusAlias + '.id'],
							include: {model: models.E_status, as: statusAlias},
							raw: true
						}).then((piechartData) => {
							const dataSet = {labels: [], backgroundColor: [], data: []};
							for (let i = 0; i < piechartData.length; i++) {
								if (dataSet.labels.indexOf(piechartData[i].f_name) != -1) {
									dataSet.data[dataSet.labels.indexOf(piechartData[i].f_name)] += piechartData[i].count
								} else {
									dataSet.labels.push(piechartData[i].f_name);
									dataSet.backgroundColor.push(piechartData[i].f_color);
									dataSet.data.push(piechartData[i].count);
								}
							}
							widgetRes.data = dataSet;
							data[widget.widgetID] = widgetRes;
							resolve();
						}).catch(resolve);
					}
					// RELATED TO PIECHART
					else if (widget.field.indexOf('r_') == 0) {
						// Find option matching wdiget's targeted alias
						let targetOption;
						try {
							const options = JSON.parse(fs.readFileSync(__dirname+'/../models/options/'+model.toLowerCase()+'.json'));
							for (const option of options) {
								if (option.relation == 'belongsTo' && option.as == widget.field) {
									targetOption = option;
									break;
								}
							}
							if (!targetOption)
								throw new Error();
						} catch(e) {
							console.error("Couldn't load piechart for "+model+" on field "+widget.field);
							return resolve();
						}

						// Build all variables required to query piechart data
						const using = targetOption.usingField ? targetOption.usingField : [{value:'id'}];
						const selectAttributes = [];
						for (const attr of using)
							selectAttributes.push('target.'+attr.value);
						const foreignKey = targetOption.foreignKey;
						const target = models['E'+targetOption.target.substring(1)].getTableName();
						const source = models[model].getTableName();

						models.sequelize.query(`
							SELECT
								count(source.id) count, ${selectAttributes.join(', ')}
							FROM
								${source} source
							LEFT JOIN
								${target} target
							ON
								target.id = source.${foreignKey}
							GROUP BY ${foreignKey}
						`, {type: models.sequelize.QueryTypes.SELECT}).then(piechartData => {
							const dataSet = {labels: [], data: []};
							for (const pie of piechartData) {
								const labels = [];
								for (const attr of using)
									labels.push(pie[attr.value])
								dataSet.labels.push(labels.join(' - '));
								dataSet.data.push(pie.count);
							}
							widgetRes.data = dataSet;
							data[widget.widgetID] = widgetRes;
							resolve();
						}).catch(resolve);
					}
					// FIELD PIECHART
					else {
						models[model].findAll({
							attributes: [widget.field, [models.sequelize.fn('COUNT', 'id'), 'count']],
							group: [widget.field],
							raw: true
						}).then((piechartData) => {
							const dataSet = {labels: [], data: []};
							for (let i = 0; i < piechartData.length; i++) {
								let label = piechartData[i][widget.field];
								if (widget.fieldType == 'enum')
									label = enums_radios.translateFieldValue(widget.entity, widget.field, label, req.session.lang_user);

								if(dataSet.labels.indexOf(label) != -1)
									dataSet.data[dataSet.labels.indexOf(label)] += piechartData[i].count
								else {
									dataSet.labels.push(label);
									dataSet.data.push(piechartData[i].count);
								}
							}
							widgetRes.data = dataSet;
							data[widget.widgetID] = widgetRes;
							resolve();
						}).catch(resolve);
					}
					break;

				default:
					console.log("Not found widget type " + widget.type);
					resolve();
					break;
			}
		}))(currentWidget, modelName));
	}

	Promise.all(widgetsPromises).then(function () {
		res.json(data);
	}).catch(function (err) {
		console.error(err);
	});
});

// *** Dynamic Module | Do not remove ***

router.get('/home', function(req, res) {

	let data = {};
	data.f_code = req.query.f_code;
	data.google_vision = appConf.google_vision;
	
	if (globalConfig.protocol == 'https') {
		data.url_events = globalConfig.protocol + '://' + globalConfig.host + '/default/events';
	}
	else {
		data.url_events = globalConfig.protocol + '://' + globalConfig.host + ':' + globalConfig.port + '/default/events';
	}
	req.session.lang_user = req.query.lang;
	res.locals.lang_user = req.query.lang;
	res.render('default/m_home', data);
});

router.get('/administration', block_access.isLoggedIn, block_access.moduleAccessMiddleware("administration"), function(req, res) {
	res.render('default/m_administration');
});

router.get('/unauthorized', block_access.isLoggedIn, (req, res) => {
	res.render('common/unauthorized');
});

router.post('/change_language', block_access.isLoggedIn, (req, res) => {
	req.session.lang_user = req.body.lang;
	res.locals.lang_user = req.body.lang;
	res.json({
		success: true
	});
});

/* Dropzone FIELD ajax upload file */
router.post('/file_upload', block_access.isLoggedIn, (req, res) => {
	upload(req, res, err => {
		try {
			if (err)
				throw err;

			const folder = req.file.originalname.split('-');
			const e_entity = req.body.entity;
			const entity = e_entity.startsWith('e_') ? e_entity.substring(2) : e_entity;

			if (typeof e_entity === 'undefined' || !e_entity || folder.length == 0)
				throw new Error("500 - Missing correct entity or folder for upload");

			if (!block_access.entityAccess(req.session.passport.user.r_group, entity))
				throw new Error("403 - Access forbidden");

			let basePath = globalConfig.localstorage + e_entity + '/' + folder[0] + '/';
			fs.mkdirsSync(basePath);

			const uploadPath = basePath + req.file.originalname;
			fs.writeFileSync(uploadPath, req.file.buffer);

			// Returning to client
			res.json({
				success: true
			});

			// We make image thumbnail for datalist
			if (req.body.dataType == 'picture') {
				basePath = globalConfig.localstorage + globalConfig.thumbnail.folder + e_entity + '/' + folder[0] + '/';
				fs.mkdirsSync(basePath);
				const thumbnailPath = basePath + req.file.originalname;
				// Upload default file as thumbnail anyway, will be overwritten if everything works perfectly for thumbnail generation
				fs.writeFileSync(thumbnailPath, req.file.buffer);
				Jimp.read(uploadPath, (err, imgThumb) => {
					if (err)
						return console.error(err);

					const thumbnailWidth = globalConfig.thumbnail.width;
					const thumbnailHeight = globalConfig.thumbnail.height;
					const thumbnailQuality = globalConfig.thumbnail.quality;
					imgThumb.resize(thumbnailWidth, thumbnailHeight).quality(thumbnailQuality).write(thumbnailPath);
				});
			}
		} catch (err) {
			console.error(err);
			res.status(500).send(err);
		}
	});
});

router.get('/get_file', block_access.isLoggedIn, (req, res) => {
	try {
		const entity = req.query.entity;
		const filename = req.query.src;
		let cleanFilename = filename.substring(16);

		// Remove uuid
		if(cleanFilename[32] == '_')
			cleanFilename = cleanFilename.substring(33);

		const folderName = filename.split("-")[0];
		const filePath = globalConfig.localstorage + entity + '/' + folderName + '/' + filename;

		if (!block_access.entityAccess(req.session.passport.user.r_group, entity.substring(2)))
			throw new Error("403 - Access forbidden");

		if (!fs.existsSync(filePath))
			throw new Error("404 - File not found");

		const picture = fs.readFileSync(filePath);

		res.json({
			data: new Buffer(picture).toString('base64'),
			file: cleanFilename
		});
	} catch (err) {
		console.error(err);
		res.status(500).send(false);
	}
});

router.get('/download', block_access.isLoggedIn, (req, res) => {
	try {
		const entity = req.query.entity;
		const filename = req.query.f;
		let cleanFilename = filename.substring(16);

		// Remove uuid
		if(cleanFilename[32] == '_')
			cleanFilename = cleanFilename.substring(33);

		const folderName = filename.split("-")[0];
		const filePath = globalConfig.localstorage + entity + '/' + folderName + '/' + filename;

		if (!block_access.entityAccess(req.session.passport.user.r_group, entity.substring(2)))
			throw new Error("403 - Access forbidden");

		if (!fs.existsSync(filePath))
			throw new Error("404 - File not found");

		res.download(filePath, cleanFilename, function (err) {
			if (err)
				console.error(err);
		});
	} catch (err) {
		console.error(err);
		req.session.toastr.push({
			level: 'error',
			message: "error.500.file"
		});
		res.redirect(req.headers.referer);
	}
});

router.post('/delete_file', block_access.isLoggedIn, (req, res) => {
	try {

		const entity = req.body.entity;
		const filename = req.body.filename;
		let cleanFilename = filename.substring(16);

		// Remove uuid
		if(cleanFilename[32] == '_')
			cleanFilename = cleanFilename.substring(33);

		const folderName = filename.split("-")[0];
		const filePath = globalConfig.localstorage + entity + '/' + folderName + '/' + filename;

		if (!block_access.entityAccess(req.session.passport.user.r_group, entity.substring(2)))
			throw new Error("403 - Access forbidden");

		if (!fs.existsSync(filePath))
			throw new Error("404 - File not found: " + filePath);

		fs.unlinkSync(filePath);

		res.status(200).send(true);

	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});

module.exports = router;