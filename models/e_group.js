const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_group.json");
const associations = require("./options/e_group.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_group',
		timestamps: true
	};

	const Model = sequelize.define('E_group', attributes, options);
	Model.associate = builder.buildAssociation('E_group', associations);
	builder.addHooks(Model, 'e_group', attributes_origin);

	return Model;
};