const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_user.json");
const associations = require("./options/e_user.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_user',
		timestamps: true
	};

	const Model = sequelize.define('E_user', attributes, options);
	Model.associate = builder.buildAssociation('E_user', associations);
	builder.addHooks(Model, 'e_user', attributes_origin);

	return Model;
};