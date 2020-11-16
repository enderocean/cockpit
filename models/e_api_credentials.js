const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_api_credentials.json");
const associations = require("./options/e_api_credentials.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_api_credentials',
		timestamps: true
	};

	const Model = sequelize.define('E_api_credentials', attributes, options);
	Model.associate = builder.buildAssociation('E_api_credentials', associations);
	builder.addHooks(Model, 'e_api_credentials', attributes_origin);

	return Model;
};