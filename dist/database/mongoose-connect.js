"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = mongoConnect;
exports.mongoDisconnect = mongoDisconnect;
const mongoose_1 = require("mongoose");
const mongo = process.env.MONGO || "mongodb://mongo:27017/mydatabase";
function mongoConnect() {
    mongoose_1.connection
        .on("error", (error) => {
        console.log("ERROR: Connection to MongoDB failed", error);
    })
        .on("close", () => {
        console.log("Connection to MongoDB ended");
        process.exit(1);
    })
        .once("open", () => {
        const infos = mongoose_1.connections;
        infos.map((info) => console.log(`Connected to ${info.host}:${info.port}/${info.name} mongo Database`));
    });
    (0, mongoose_1.connect)(mongo);
}
function mongoDisconnect() {
    return mongoose_1.connection.close();
}
