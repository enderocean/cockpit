const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_role.json");
const associations = require("./options/e_role.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_role',
		timestamps: true
	};

	const Model = sequelize.define('E_role', attributes, options);
	Model.associate = builder.buildAssociation('E_role', associations);
	builder.addHooks(Model, 'e_role', attributes_origin);

	return Model;
};