const express = require("express");
const http = require("http");

const AppConfig = require("./config/app-config");
const Routes = require("./routes");

class Server {
	constructor() {
		this.app = express();
		this.http = http.Server(this.app);
	}
	appConfig() {
		new AppConfig(this.app).includeConfig();
	}
	includeRoutes() {
		new Routes(this.app).includeRoutes();
	}
	startTheServer() {
		this.appConfig();
		this.includeRoutes();

		const host = process.env.NODE_SERVER_HOST || "0.0.0.0";
		const port = process.env.NODE_SERVER_PORT || 3000;

		this.http.listen(port, host, ()=> {
			console.log(`Listening on http://${host}:${port}`)
		});
	}
}

module.exports = new Server();