const Sequelize = require("sequelize");
const fs = require("fs");

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
					const model = db[database].import(path.join(`${__dirname}/${database}`, file));
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