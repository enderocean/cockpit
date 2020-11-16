const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_synchronization.json");
const associations = require("./options/e_synchronization.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_synchronization',
		timestamps: true
	};

	const Model = sequelize.define('E_synchronization', attributes, options);
	Model.associate = builder.buildAssociation('E_synchronization', associations);
	builder.addHooks(Model, 'e_synchronization', attributes_origin);

	return Model;
};