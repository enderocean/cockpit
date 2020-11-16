const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_robot.json");
const associations = require("./options/e_robot.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_robot',
		timestamps: true
	};

	const Model = sequelize.define('E_robot', attributes, options);
	Model.associate = builder.buildAssociation('E_robot', associations);
	builder.addHooks(Model, 'e_robot', attributes_origin);

	return Model;
};