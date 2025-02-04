const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "School",
    tableName: "schools",
    columns: {
        id: { type: "int", primary: true, generated: true },
        name: { type: "varchar" }
    }
});
