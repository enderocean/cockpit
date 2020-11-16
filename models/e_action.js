const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_action.json");
const associations = require("./options/e_action.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_action',
		timestamps: true
	};

	const Model = sequelize.define('E_action', attributes, options);
	Model.associate = builder.buildAssociation('E_action', associations);
	builder.addHooks(Model, 'e_action', attributes_origin);

	return Model;
};