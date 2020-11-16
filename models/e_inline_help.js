const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_inline_help.json");
const associations = require("./options/e_inline_help.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_inline_help',
		timestamps: true
	};

	const Model = sequelize.define('E_inline_help', attributes, options);
	Model.associate = builder.buildAssociation('E_inline_help', associations);
	builder.addHooks(Model, 'e_inline_help', attributes_origin);

	return Model;
};