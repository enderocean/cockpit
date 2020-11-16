const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_translation.json");
const associations = require("./options/e_translation.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_translation',
		timestamps: true
	};

	const Model = sequelize.define('E_translation', attributes, options);
	Model.associate = builder.buildAssociation('E_translation', associations);
	builder.addHooks(Model, 'e_translation', attributes_origin);

	return Model;
};