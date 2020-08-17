const CONSTANTS = require("../utils/constants");

const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

class SequelizeClient {
	constructor(dbConfig) {
		this.dbConfig = dbConfig;
	}
	getClient() {
		const db = {};
		const databases = Object.keys(this.dbConfig);

		for (let i = 0; i < databases.length; i += 1) {
			const database = databases[i];
			const dbPath = this.dbConfig[database];
			db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);

			fs
				.readdirSync(`${__dirname}/models/${database}`)
				.filter((file) => (file.indexOf(".") !== 0)
					&& (file !== basename)
					&& (file.slice(-3) === ".js"))
				.forEach((file) => {
					const model = db[database].import(path.join(`${__dirname}/models/${database}`, file));
					db[database][model.name] = model;
				});
		}

		Object.keys(db)
			.forEach((dbName) => {
				Object.keys(db[dbName])
					.forEach((modelName) => {
						if (db[dbName][modelName].associate) {
							db[dbName][modelName].associate(db[dbName]);
						}
					});
			});
		return db;
	}
}

module.exports = SequelizeClient;

module.exports.createData = (model, data)=>
	new Promise((resolve, reject)=> {
		model.create(data)
			.then(result=> resolve(result))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});
module.exports.updateData = (model, where, updatedData)=>
	new Promise((resolve, reject)=> {
		model.update(updatedData, {
			where
		}).then(data=> resolve(data))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});
module.exports.getDataList = (model, where, order, limit, offset)=>
	new Promise((resolve, reject)=> {
		model.findAll({
			where,
			order,
			limit,
			offset
		}).then(result => resolve(result))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});
module.exports.getSingleRow = (model, where, order)=>
	new Promise((resolve, reject)=> {
		model.findOne({
			where,
			order,
			raw: true
		}).then(data => resolve(data))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});
module.exports.deleteData = (model, where)=>
	new Promise((resolve, reject)=> {
		model.destroy({where})
			.then(result=> resolve(result))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});
module.exports.getDataCount = (model, where)=>
	new Promise((resolve, reject)=> {
		model.count({
			where
		}).then(count=> resolve(count))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});
module.exports.getDataBasedOnQuery = (model, queryData)=>
	new Promise((resolve, reject)=> {
		model.query(queryData.query, {
			replacements: queryData.replacements,
			type: model.QueryTypes.SELECT
		}).then(data=> resolve(data))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});
module.exports.createBulkData = (model, records, options)=>
	new Promise((resolve, reject)=> {
		model.bulkCreate(records, options)
			.then(data=> resolve(data))
			.catch(err=> {
				err.error_code = CONSTANTS.SEQUELIZE_ERROR;
				return reject(err);
			});
	});