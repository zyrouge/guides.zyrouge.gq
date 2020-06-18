const config = require("./config");
const path = require("path");
const chalk = require("chalk");
const express = require("express");
const server = express();

const dir = path.join(__dirname, config.outDir);
server.use(express.static(dir));

server.listen(config.port, () => console.log(`Serving ${chalk.cyanBright(dir)} and listening on PORT ${chalk.greenBright(config.port)}`));