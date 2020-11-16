const builder = require('../utils/model_builder');

const attributes_origin = require("./attributes/e_user_guide.json");
const associations = require("./options/e_user_guide.json");

module.exports = (sequelize, DataTypes) => {
	const attributes = builder.buildForModel(attributes_origin, DataTypes);
	builder.attributesValidation(attributes);
	const options = {
		tableName: 'e_user_guide',
		timestamps: true
	};

	const Model = sequelize.define('E_user_guide', attributes, options);
	Model.associate = builder.buildAssociation('E_user_guide', associations);
	builder.addHooks(Model, 'e_user_guide', attributes_origin);

	return Model;
};