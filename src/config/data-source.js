const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        require("../models/User"),
        require("../models/Group"),
        require("../models/School")
    ],
    synchronize: true
});

module.exports = { AppDataSource };
//sassss
