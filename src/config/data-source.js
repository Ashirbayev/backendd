const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'postgresql://mydb_02ar_user:JhDlY68ypy7TSrcmBPItklX1Q2J17rcJ@dpg-cugomhjtq21c73f1qs10-a/mydb_02ar',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'mydb_02ar_user',
    password: process.env.DB_PASSWORD || 'JhDlY68ypy7TSrcmBPItklX1Q2J17rcJ',
    database: process.env.DB_NAME || 'mydb_02ar',
    entities: [
        require("../models/User"),
        require("../models/Group"),
        require("../models/School")
    ],
    synchronize: true
});

module.exports = { AppDataSource };
//sassss
