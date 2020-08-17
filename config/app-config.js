const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const ExpressConfig = require("./express-config");
const DBConfig = require("./db-config");

class AppConfig {
	constructor(app) {
		process.on("unhandledRejection", (reason, p)=> {
			console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
		});

		this.app = app;
	}

	loadAppLevelConfig() {
		this.app.use(
			bodyParser.json()
		);
		this.app.use(
			cors()
		);
		this.app.use((req, res, next)=> {
			if (req && !req.headers["x-correlation-id"]) {
				req.x_correlation_id = uuid.v4();
				res.setHeader("X-Correlation-ID", req.x_correlation_id);
			}
			next();
		})
	}

	loadExpressConfig() {
		new ExpressConfig(this.app).setAppEngine();
	}

	loadDBConfig() {
		const sequelizeClient = DBConfig.getSequelizeClient();
		this.app.use((req, res, next)=> {
			req.headers.sequelize = sequelizeClient;
			next();
		});
	}

	includeConfig() {
		this.loadAppLevelConfig();
		this.loadExpressConfig();
		this.loadDBConfig();
	}
}

module.exports = AppConfig;