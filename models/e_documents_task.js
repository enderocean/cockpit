const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_documents_task.json");
const associations = require("./options/e_documents_task.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_documents_task',
		timestamps: true
	};

	const Model = sequelize.define('E_documents_task', attributes, options);
	Model.associate = builder.buildAssociation('E_documents_task', associations);
	builder.addHooks(Model, 'e_documents_task', attributes_origin);

	return Model;
};