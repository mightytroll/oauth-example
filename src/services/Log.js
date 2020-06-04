import config from "config";
import winston from "winston";
import os from "os";
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

let transports = [];

if (config.has("log.console")) {
    let options = Object.assign(
        {
            silent: true,
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        },
        config.get("log.console")
    );

    transports.push(new winston.transports.Console(options));
}

if (config.has("log.sumologic")) {
    let options = Object.assign(
        {
            silent: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            headers: {
                "X-Sumo-Host": os.hostname(),
                "X-Sumo-Name": packageJson.name
            }
        },
        config.get("log.sumologic")
    );

    transports.push(new winston.transports.Http(options));
}

export const Log = winston.createLogger({
    transports: transports
});
