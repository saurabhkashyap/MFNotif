const bodyParser = require("body-parser");
const cors = require("cors");

const ExpressConfig = require("./express-config");

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
	}

	loadExpressConfig() {
		new ExpressConfig(this.app).setAppEngine();
	}

	includeConfig() {
		this.loadAppLevelConfig();
		this.loadExpressConfig();
	}
}

module.exports = AppConfig;