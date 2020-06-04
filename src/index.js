import config from "config";
import mongoose from "mongoose";
import { Application } from "./application/Application";
import { Log } from "./services/Log";

function run() {
    let port = config.has("server.port") ? config.get("server.port") : 3000;

    return Application.listen(port, () => {
        if (Log) {
            Log.debug(`Listening on port ${port}...`);
        }
    });
}

if (config.has("db.url")) {
    Log.debug("Connecting to Mongo...");

    let mongooseOptions = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    if (config.has("db.user") && config.has("db.pass")) {
        Log.debug("Using username and password.");
        mongooseOptions.user = config.get("db.user");
        mongooseOptions.pass = config.get("db.pass");
    }

    // Connect to the Database prior to starting the App.
    mongoose
        .connect(config.get("db.url"), mongooseOptions)
        .then(() => {
            // Connection successful, start the server.
            run();
        })
        .catch((error) => {
            // Failed to connect to database.
            Log.error(error);
        });
} else {
    run();
}
