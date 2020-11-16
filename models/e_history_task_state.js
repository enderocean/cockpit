const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_history_task_state.json");
const associations = require("./options/e_history_task_state.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_6_history_s_state',
		timestamps: true
	};

	const Model = sequelize.define('E_history_task_state', attributes, options);
	Model.associate = builder.buildAssociation('E_history_task_state', associations);
	builder.addHooks(Model, 'history_task_state', attributes_origin);

	return Model;
};