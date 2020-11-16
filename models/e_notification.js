const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_notification.json");
const associations = require("./options/e_notification.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_notification',
		timestamps: true
	};

	const Model = sequelize.define('E_notification', attributes, options);
	Model.associate = builder.buildAssociation('E_notification', associations);
	builder.addHooks(Model, 'e_notification', attributes_origin);

	return Model;
};