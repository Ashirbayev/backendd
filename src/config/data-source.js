const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Astana2042',
    database: 'mydb',
    entities: [
        require("../models/User"),
        require("../models/Group"),
        require("../models/School")
    ],
    synchronize: true
});

module.exports = { AppDataSource };
