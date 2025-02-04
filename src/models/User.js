const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: { type: "int", primary: true, generated: true },
        name: { type: "varchar" },
        age: { type: "int" },
        group_id: { type: "int" }
    },
    relations: {
        group: {
            target: "Group",
            type: "many-to-one",
            joinColumn: { name: "group_id" }
        }
    }
});
