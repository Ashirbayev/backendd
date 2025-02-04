const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Astana2042',
    database: process.env.DB_NAME || 'mydb',
    entities: [
        require("../models/User"),
        require("../models/Group"),
        require("../models/School")
    ],
    synchronize: true
});

module.exports = { AppDataSource };
//sassss
